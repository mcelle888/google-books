export const getBooksfromSearch = async (searchTerm, startIndex = 0, maxResults = 20) => {
    if (searchTerm === '') {
      throw new Error("Search input cannot be empty")
    }
  
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`
      )
  
      if (!response.ok) {
        throw new Error("Failed to fetch from API")
      }
  
      const data = await response.json()
      const results = data.items || []
  
      if (results.length === 0) {
        throw new Error(`No books found for "${searchTerm}"`)
      }
  
      return results
    } catch (error) {
      console.error("Error fetching books:", error)
      throw error
    }
  }



  export const getBookById = async (bookId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
  
      const data = await response.json();
  
      if (!data || !data.volumeInfo) {
        throw new Error('Book details not found');
      }
  
      return data;  
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
    }
  };
  