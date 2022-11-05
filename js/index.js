const userList = document.querySelector('#user-list') //this is ul
// const userUrl = 'https://api.github.com/search/users?q=octocat'
const form = document.getElementById('github-form')
const searchBar = document.querySelector('#search')


form.addEventListener('submit', e => {
    e.preventDefault()

    console.log(searchBar.value)

    fetch(`https://api.github.com/search/users?q=${searchBar.value}`)
    .then(resp => resp.json())
    .then(json => {
        console.log(json)
        console.log(json.items)

        //Created avatar
        const avatarLi = document.createElement('li')
        const avatar = document.createElement('img')
        avatar.src = json.items[0].avatar_url
        avatar.alt = 'Avatar'
        avatar.style.verticalAlign = 'middle'
        avatar.style.width = '50px'
        avatar.style.height = '50px'
        avatar.style.borderRadius = '50%'

        avatarLi.appendChild(avatar)
        userList.appendChild(avatarLi)


        //Created username
        const userName = document.createElement('li')
        userName.textContent = `Username: ${json.items[0].login}`
        userList.appendChild(userName)

        //Created profile link
        const userLi = document.createElement('li')
        const profileLink = document.createElement('a')

        profileLink.href = json.items[0].html_url
        profileLink.target = '_blank'
        profileLink.textContent = `Github Profile`

        userLi.appendChild(profileLink)
        userList.appendChild(userLi)
        
        //Created repo link
        const repoLi = document.createElement('li')
        const repoLink = document.createElement('a')

        repoLink.href = '#'
        //json.items[0].repos_url
        repoLink.textContent = 'Github Repositories'

        repoLi.appendChild(repoLink)
        userList.appendChild(repoLi)


        repoLink.addEventListener('click', () => {
           fetch(json.items[0].repos_url)
           .then(response => response.json())
           .then(json => {

            for(let i = 0; i < json.length; i++){
                const ul = document.querySelector('#repos-list')
                const li = document.createElement('li')
                const h3 = document.createElement('h3')

                h3.textContent = json[i].name
                li.appendChild(h3)

                if(json[i].description){
                    const p = document.createElement('p')
                    p.textContent = `Description: ${json[i].description}`
                    li.appendChild(p)
                }

                ul.appendChild(li)

            }
           })
        })




        const br = document.createElement('br')
        userList.appendChild(br)
    })


    searchBar.value = ''
})
