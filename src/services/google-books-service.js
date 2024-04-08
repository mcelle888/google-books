export const getBooksfromSearch = async(searchTerm) => {
    if(searchTerm === "") {
        throw new Error ("Search input cannot be empty")
    }

    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40`
    )
    if (!response.ok) {
        throw new Error("Failed to fetch from API")
    }

    const data = await response.json()
    const results = data.items

    console.log(results)
    if (results.length === 0) {
        throw new Error (`No books found for "${searchTerm}"`)
    }
    return results
}