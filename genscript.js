const apiScopes = [...document.querySelectorAll('body > div.main > section > table:nth-child(7) > tbody > tr > td > code')].map(n => n.innerText)
const apiScopesDescriptions = [...document.querySelectorAll('body > div.main > section > table:nth-child(7) > tbody > tr > td:nth-child(2)')].map(n => n.innerText)
const api = {}
for (const scope of apiScopes) {
    const index = apiScopes.indexOf(scope)
    api[scope] = apiScopesDescriptions[index]
}
