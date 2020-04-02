const formatDate = date =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

const sleep = t => new Promise(resolve => setTimeout(resolve, t))

function fetchPokemon(name, delay = 700) {
  const endTime = Date.now() + delay
  const pokemonQuery = `
    query ($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `

  return window
    .fetch('https://graphql-pokemon.now.sh', {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: {name: name.toLowerCase()},
      }),
    })
    .then(response => response.json())
    .then(async response => {
      await sleep(endTime - Date.now())
      return response
    })
    .then(response => {
      const pokemon = response.data.pokemon
      if (pokemon) {
        pokemon.fetchedAt = formatDate(new Date())
        return pokemon
      } else {
        return Promise.reject(new Error(`No pokemon with the name "${name}"`))
      }
    })
}

export default fetchPokemon
