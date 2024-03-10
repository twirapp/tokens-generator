const apiScopes = [...document.querySelectorAll('body > div.main > section > table:nth-child(7) > tbody > tr > td > code')].map(n => n.innerText)
const apiScopesDescriptions = [...document.querySelectorAll('body > div.main > section > table:nth-child(7) > tbody > tr > td:nth-child(2)')].map(n => n.innerText.split('\n')[0])
const api = {}
for (const scope of apiScopes) {
    const index = apiScopes.indexOf(scope)
    api[scope] = apiScopesDescriptions[index]
}

const chatScopes = [...document.querySelectorAll('body > div.main > section > table:nth-child(9) > tbody > tr > td:nth-child(1) > code')].map(n => n.innerText)
const chatScopesDescriptions = [...document.querySelectorAll('body > div.main > section > table:nth-child(9) > tbody > tr > td:nth-child(2)')].map(n => n.innerText)
const chat = {}
for (const scope of chatScopes) {
  const index = chatScopes.indexOf(scope)
  chat[scope] = chatScopesDescriptions[index]
}