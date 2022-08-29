document.addEventListener("DOMContentLoaded", function() {
    let ul = document.getElementById(`list`)
    let divPanel = document.getElementById(`show-panel`)

    function removeChildNodes(parent) {
        while(parent.firstChild){
            parent.firstChild.remove()
        }
    }
    
    fetch(`http://localhost:3000/books`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(({id, title, users, description, img_url}) => {
            let li = document.createElement(`li`)
            let btn = document.createElement(`button`)

            li.textContent = title
            btn.textContent = `LIKE`
            li.addEventListener(`click`, () => {
                removeChildNodes(divPanel)
                let img = document.createElement(`img`)
                let desc = document.createElement(`p`)
                let userList = document.createElement(`ul`)
                
                img.src = img_url
                desc.textContent = description
                userList.id = `user-box`
                users.forEach((user) => {
                    let userLi = document.createElement(`li`)
                    userLi.textContent = user.username
                    userLi.id = user.id
                    userList.appendChild(userLi)
                })
                btn.addEventListener(`click`, () => {
                    console.log(users)
                    if (document.getElementById(`10`)) {
                        fetch(`http://localhost:3000/books/${id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                users: [
                                    {id: 8, username: 'maverick'},
                                ]
                            })
                        })
                        document.getElementById(`10`).remove()
                    } else {
                        fetch(`http://localhost:3000/books/${id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                users: [
                                    {id: 8, username: 'maverick'},
                                    {id: 10, username: 'macejkovic'}
                                ]
                            })
                        })
                        let li = document.createElement(`li`)
                        li.id = 10
                        li.textContent = `macejkovic`
                        document.getElementById(`user-box`).appendChild(li)
                    }              
                })
                divPanel.append(img, desc, userList, btn)
            })
            ul.appendChild(li)
        });
        
    })
});