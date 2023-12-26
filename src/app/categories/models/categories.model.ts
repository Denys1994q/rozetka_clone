import { IProduct } from "src/app/product/models/product.model";

export interface IPopularCategory {
    name: string;
    engName: string;
    id: string;
    img?: string;
}

export interface IBanner {
    url?: string;
}

export interface IPopularSubcategory {
    name: string;
    engName: string;
    id: string;
}

export interface ISubcategory {
    name: string;
    img: string;
    engName: string;
    id: string;
    popular: IPopularSubcategory[];
    products: IProduct[]
}

export interface ICategory {
    name: string;
    engName: string;
    id: string;
    icon?: string;
    popular: IPopularCategory[];
    banners: IBanner[];
    brands: string[];
    subCategories: ISubcategory[];
}
