import { ICategory } from "src/app/categories/models/categories.model"
import { IComment } from "src/app/comment/models/comment.model"
import { Slide } from "src/app/carousel/carousel.component"

interface Img {
    url: string
}

interface Info {
    heading: string,
    text: string
}

interface Price {
    new: number,
    old: number
}

export interface ISearchStatus {
    searchPosition: string,
    title: string,
    option: any
}

export interface IProduct {
    _id: string,
    title: string,
    engName: string,
    category?: string,
    subCategory?: string,
    image: string,
    image_mob?: string,
    image2: string,
    images: Img[],
    video?: any,
    info_brief: string,
    info_full: Info[],
    info: Info[],
    rating?: number,
    raiting?: number,
    price: Price,
    seller: string,
    sellStatus: string,
    reviews_data: IComment[],
    date: Date,
    searchStatus: ISearchStatus[],
    addedDate?: Date,
    isInWishlist?: boolean,
    isInCart?: boolean
    isAvailable: boolean
}

export interface IProductCart extends IProduct {
    amount: number
}