const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
const errorElement = document.getElementById('error-element');
const sortBtn = document.getElementById('sort-btn')



let selectedCategor = 1000;
let sortByView = false;

sortBtn.addEventListener('click', () => {
    sortByView = true;
    fetchDataByCategories(selectedCategor, sortByView)
})


const fetchCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories';
    const res = await fetch(url)
    const data = await res.json();
    const categories = data.data;

    categories.forEach((card) => {
        const newBtn = document.createElement('button');
        newBtn.innerText = card.category;
        newBtn.classList = "category-btn btn btn-ghost bg-slate-700 text-white text-lg";
        newBtn.addEventListener('click', () => {
            fetchDataByCategories(card.category_id)
            const allBtns = document.querySelectorAll('.category-btn');

            for(const btn of allBtns){
                btn.classList.remove('bg-red-600')
            }

            newBtn.classList.add('bg-red-600')
        })
        btnContainer.append(newBtn)
    })
}


const fetchDataByCategories = async (categoryId, sortByView) => {
    selectedCategor = categoryId;
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    const videoData = data.data;

    if(sortByView){
        videoData.sort((a, b)  => {
            const totalViewsStrFirst = a.others?.views;
            const totalViewsStrSecond = b.others?.views;

            const totalViewsFirstNumber = parseFloat(totalViewsStrFirst.replace('K', '') || 0)
            const totalViewsSecondNumber = parseFloat(totalViewsStrSecond.replace('K', '') || 0)

            return totalViewsSecondNumber - totalViewsFirstNumber;
        })
    }

    if(videoData.length === 0){
        errorElement.classList.remove('hidden')
    }
    else{
        errorElement.classList.add('hidden')
    }

    cardContainer.textContent = '';
    videoData.forEach((video) => {
        const {thumbnail, title, authors, others} = video;
        const {profile_name, profile_picture, verified} = authors[0]
        
        let verifiedBadge = '';
        if(verified){
            verifiedBadge = '<img class="w-6 h-6" src="images/verified-loog.png" alt="">';
        }
        console.log(video)
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        
        <div class="card w-full bg-base-100 shadow-xl">
            <figure class="overflow-hidden h-72">
                <img class="w-full" src=${thumbnail} />
                <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
            </figure>
            <div class="card-body">
                <div class="flex space-x-4 justify-start items-start">
                    <div>
                        <img class="w-12 h-12 rounded-full" src=${profile_picture}alt="Shoes" />
                    </div>
                    <div>
                        <h2 class="card-title">${title}</h2>
                        <div class="flex mt-3">
                            <p class="">${profile_name}</p>
                            ${verifiedBadge}
                        </div>
                        <p class="mt-3">${others.views}</p>
                    </div>
                </div>
            </div>
        </div>
        `;

        cardContainer.appendChild(newCard)
    })
}



fetchCategories()
fetchDataByCategories(selectedCategor, sortByView)