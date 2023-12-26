interface Img {
    url: string
}

interface Info {
    heading: string,
    text: string
}

interface Review {
    author: string,
    date: Date,
    text: string,
    rating?: number,
    raiting?: number,
    likes: number,
    dislikes: number,
    photo: string
}

interface Price {
    new: number,
    old: number
}

export interface ISearchStatus {
    searchPosition: string,
    title: string,
    option: string | Price | boolean
}

export interface IProduct {
    _id: string,
    title: string,
    engName: string,
    image: string,
    image_mob?: string,
    image2: string,
    images: Img[],
    info_brief: string,
    info_full: Info[],
    info: Info[],
    reviews_data: Review[],
    date: Date,
    searchStatus: ISearchStatus[],
    amount?: number,
    addedDate?: Date,
}