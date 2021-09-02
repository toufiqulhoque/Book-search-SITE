const loadSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //display Spinner
    toggleSpinner('block');

    // clear data
    searchField.value = '';
    //Fetch Data
    let = url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
}
//Using spinner
const toggleSpinner = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
}


//Display data
const displaySearchResult = data => {
    console.log(data);
    const searchResult = document.getElementById('search-result')
    // clear Content
    searchResult.textContent = ''
    data.docs.forEach(doc => {
        console.log(doc)


        const div = document.createElement('div')
        div.classList.add('col')
        //Creat HTML
        div.innerHTML = `
        
        <div onclick="cardClicked()" class="card h-100 rounded-3" style="background-color: #dbc76f;">
                <img  src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : '10909258'}-M.jpg" class="card-img-top p-4 m-auto rounded-3" alt="..."style="width: 100%; height: 400px;">

                <h3 class="card-title px-3">Book Name:${doc.title ? doc.title : 'Unknown'}</h3>
                <h5 class="card-title px-3">Author Name:${doc.author_name ? doc.author_name : 'Unknown'}</h5>
                <h5 class="card-title px-3">Publish Year:${doc.publish_year ? doc.publish_year : 'Unknown'}</h5>
                <h5 class="card-title px-3">Publisher:${doc.publisher ? doc.publisher : 'Unknown publisher'}</h5>
                <h5 class="card-title px-3">First Publish Year:${doc.first_publish_year}</h5>
                <p class="card-text px-3">Edition:${doc.edition_count ? doc.edition_count : 'Unknown'}</p>
                
                
        </div>`

        searchResult.appendChild(div);

    })
    toggleSpinner('none')


    //Some handling
    if (data.q === '' || data.numFound === 0) {
        const resultCount = document.getElementById('result-count')
        resultCount.innerHTML = `
        <h2>no results found</h2>`
    }
    else {
        const resultCount = document.getElementById('result-count')
        resultCount.innerHTML = `
        <h2>Total Book Found: ${data.numFound} </h2>`
    }

}












