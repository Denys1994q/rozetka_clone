import { ProductInterface } from "src/app/core/services/api-response-types";

export interface PopularCategory {
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

// Модель для Subcategory
export interface ISubcategory {
    name: string;
    img: string;
    engName: string;
    id: string;
    popular: IPopularSubcategory[];
    products: ProductInterface[]
}

// Модель для Category
export interface ICategory {
    name: string;
    engName: string;
    id: string;
    icon?: string;
    popular: PopularCategory[];
    banners: IBanner[];
    brands: string[];
    subCategories: ISubcategory[];
}
