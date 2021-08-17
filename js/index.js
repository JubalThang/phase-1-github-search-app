
const BASE_URL = 'https://api.github.com/search/users?q='

const headers = {
    'Content-Type': 'application/json',
    Accept : 'applicatoin/vnd.github.v3+json'
}
//global variables
let form
let userList 
let repoList

//Variable initialized 
document.addEventListener('DOMContentLoaded', e => {
    userList = document.querySelector('#user-list')
    repoList = document.querySelector('#repos-list')

    form = document.querySelector('#github-form')
        .addEventListener('submit', (e) => handleSearch(e))
})

function handleSearch(e) {
    e.preventDefault()
    fetch(BASE_URL + e.target.search.value, {
        method: 'GET',
        headers: headers
    })
        .then(res => res.json())
        .then(data => data.items.forEach(user => displayUser(user)))
        .catch(error => console.error(error))
    e.target.reset()
}

function displayUser(user) {

    // console.log(user)

    const li = document.createElement('li')
    const container = document.createElement('div')
    const usernameH2 = document.createElement('h2')
    const userAvator = document.createElement('img')
    const profileUrl = document.createElement('p')

    // container.id = 'github-container'
    // container.style.padding = '30px'
    // container.style.marginTop = '10px'
    container.addEventListener('click', () => fetchUserRepos(user.repos_url))
    usernameH2.textContent = user.login
    userAvator.src = user.avatar_url 
    profileUrl.innerHTML = `<a href=${user.html_url}>Profile link</a>`

    container.append(usernameH2, userAvator, profileUrl)
    li.append(container)

    userList.appendChild(li)
}

function fetchUserRepos(url) {
    userList.innerHTML = ''

    fetch(url, {
        method: 'GET',
        headers : headers
    })
    .then(resp => resp.json())
    .then(repos => repos.forEach(repo => displayRepo(repo)))
    .catch(error => console.log('Error fetching Repo :',error))
    console.log(url)
}

function displayRepo(repo) {
    const repoNameH2 = document.createElement('h2')

    repoNameH2.textContent = repo.name

    const li = document.createElement('li')
    li.appendChild(repoNameH2)

    repoList.append(li)
}