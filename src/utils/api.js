const BASE_URL="https://www.sankavollerei.com/comic"

export async function getHome() {
    try {
        const response = await fetch(`${BASE_URL}/homepage`)
        if (!response.ok) throw new Error("Gagal ambil data home");

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching home data:", error)
        return null
    }
}

export async function getPopular(page=1) {
    try {
        const response = await fetch(`${BASE_URL}/populer?page=${page}`)
        if (!response.ok) throw new Error("Gagal ambil data populer");

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching popular data:", error)
        return null
    }
}

export async function getList(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/pustaka/${page}`)
        if (!response.ok) throw new Error("Gagal ambil data list");

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching list data:", error)
        return null
    }
}

export async function getTrending() {
    try {
        const response = await fetch(`${BASE_URL}/trending`)
        if (!response.ok) throw new Error("Gagal ambil data trending");

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching trending data:", error)
        return null
    }
}

export async function getLatest(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/terbaru?page=${page}`)
        if (!response.ok) throw new Error("Gagal ambil data latest");

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching latest data:", error)
        return null
    }   
}



export async function getGenre(genre, page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/genre/${genre}?page=${page}`)
        if (!response.ok) throw new Error("Gagal ambil data genre");   

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching genre data:", error)
        return null
    }
}


export async function getSearchResults(query) {
    try {
        const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) throw new Error("Gagal ambil data hasil pencarian"); 

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching search results:", error)
        return null
    }
}

export async function getManga(id) {
    try {
        const response = await fetch(`${BASE_URL}/comic/${id}`)
        if (!response.ok) throw new Error("Gagal ambil data manga");

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching manga data:", error)
        return null
    }
}

export async function getChapter(id) {
    try {
        const response = await fetch(`${BASE_URL}/chapter/${id}`)
        if (!response.ok) throw new Error("Gagal ambil data chapter");          

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching chapter data:", error)
        return null
    }
}