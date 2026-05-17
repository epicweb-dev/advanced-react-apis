import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const patchMarker = 'advanced-react-apis catch-all POST patch'

export async function patchWorkshopApp({
	serverBuildPath = getWorkshopAppServerBuildPath(),
} = {}) {
	let serverBuild = await fs.readFile(serverBuildPath, 'utf8')

	if (serverBuild.includes(patchMarker)) {
		return { patched: false, reason: 'already-patched' }
	}

	serverBuild = addCatchAllAction(serverBuild)

	await fs.writeFile(serverBuildPath, serverBuild)

	return { patched: true }
}

function getWorkshopAppServerBuildPath() {
	const packageJsonPath = fileURLToPath(
		import.meta.resolve('@epic-web/workshop-app/package.json'),
	)
	return path.join(path.dirname(packageJsonPath), 'build/server/index.js')
}

function addCatchAllAction(serverBuild) {
	const routeModuleMatch = serverBuild.match(
		/("routes\/\$": \{\n\s+id: "routes\/\$",\n\s+parentId: "root",\n\s+path: "\*",\n\s+index: void 0,\n\s+caseSensitive: void 0,\n\s+module: )(route\d+)(\n\s+\})/,
	)

	if (!routeModuleMatch) {
		throw new Error('Could not find the workshop app catch-all route module.')
	}

	const [, , routeModuleName] = routeModuleMatch
	const routeModuleDeclaration = new RegExp(
		`const ${routeModuleName} = /\\* @__PURE__ \\*/ Object\\.freeze\\(/\\* @__PURE__ \\*/ Object\\.defineProperty\\(\\{\\n([\\s\\S]*?)\\n\\}, Symbol\\.toStringTag, \\{ value: "Module" \\}\\)\\);`,
	)
	const routeModuleDeclarationMatch = serverBuild.match(routeModuleDeclaration)

	if (!routeModuleDeclarationMatch) {
		throw new Error('Could not find the workshop app catch-all route exports.')
	}

	if (routeModuleDeclarationMatch[1]?.includes('\n  action,')) {
		return serverBuild
	}

	const routeModuleStartIndex = routeModuleDeclarationMatch.index ?? 0
	const precedingBuild = serverBuild.slice(0, routeModuleStartIndex)
	const loaderNameMatch = precedingBuild.match(/async function (loader\$\w+)\(/g)?.at(-1)
	const loaderName = loaderNameMatch?.match(/async function (loader\$\w+)\(/)?.[1]

	if (!loaderName) {
		throw new Error('Could not find the workshop app catch-all loader.')
	}

	const loaderEnd = precedingBuild.lastIndexOf('\n}\n')
	if (loaderEnd === -1) {
		throw new Error('Could not find the end of the catch-all loader.')
	}

	const actionName = `action${loaderName.slice('loader'.length)}`
	const actionSource = `\nasync function ${actionName}() {\n  // ${patchMarker}: POSTs to the splat route should be a normal 404.\n  throw new Response("Not found", {\n    status: 404\n  });\n}\n`
	const withActionFunction =
		serverBuild.slice(0, loaderEnd + 3) +
		actionSource +
		serverBuild.slice(loaderEnd + 3)

	return withActionFunction.replace(
		`const ${routeModuleName} = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({\n  __proto__: null,`,
		`const ${routeModuleName} = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({\n  __proto__: null,\n  action: ${actionName},`,
	)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	await patchWorkshopApp()
}
