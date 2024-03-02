const btnContainer = document.getElementById('btn-container');

const fetchCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories';
    const res = await fetch(url)
    const data = await res.json();
    const categories = data.data;

    categories.forEach((card) => {
        const newBtn = document.createElement('button');
        newBtn.innerText = card.category;
        newBtn.classList = "btn btn-ghost bg-slate-700 text-white text-lg";
        newBtn.addEventListener('click', () => fetchDataByCategories(card.category_id))
        btnContainer.append(newBtn)
    })
}


const fetchDataByCategories = (categoryId) => {
    console.log(categoryId)
}



fetchCategories()