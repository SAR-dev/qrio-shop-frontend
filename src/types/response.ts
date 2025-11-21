import {
    BlogsResponse,
    CategoriesResponse,
    ImagesResponse,
    InvoicesResponse,
    ProductsResponse,
    SeriesResponse,
    ShippingChargesResponse,
    UsersResponse,
} from "./pocketbase";

// filter fields data
export interface FilterFieldResType {
    seriesList: FilterField[]
    categoryList: FilterField[]
}

export interface FilterField {
    id: string;
    title: string;
}

// product details
export type TexpandBlogDetailsResType = BlogsResponse & {
    expand: {
        cover: ImagesResponse;
        images: ImagesResponse[];
        author: UsersResponse;
    };
};

// product details
export type TexpandProductDetailsResType = ProductsResponse & {
    expand: {
        categories: CategoriesResponse;
        series: SeriesResponse;
        images: ImagesResponse[];
    };
};

// invoice details
export type TexpanInvoiceDetailsResType = InvoicesResponse & {
    expand: {
        shippingCharge: ShippingChargesResponse;
    };
};

// invoice products
export interface InvoiceProductResType {
    invoiceProducts: InvoiceProduct[]
}

export interface InvoiceProduct {
    id: string
    title: string
    slug: string
    amount: number
    sellingPrice: number
    discount: number
    productImageId: string
    productImageSource: string
}

// cart products
export interface CartProductResType {
    cartProducts: CartProduct[]
}

export interface CartProduct {
    id: string
    title: string
    amount: number
    discount: number
    slug: string
    sellingPrice: number
    cartId: string
    productImageId: string
    productImageSource: string
}

// blog filter
// product filter
export interface FilteredBlogResType {
    items: BlogData[]
    pageNo: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}

// product filter
export interface FilteredProductResType {
    items: ProductData[]
    pageNo: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}

// product suggestions
export interface WishlistResType {
    wishedProducts: ProductData[]
}

// product suggestions
export interface ProductSuggestResType {
    suggestedProducts: ProductData[]
}

// homepage lists
export interface HomepageListResType {
    seriesList: SeriesData[];
    blogList: BlogData[];
    categoryList: CategoryData[];
}

export interface SeriesData {
    id: string;
    title: string;
    slug: string;
    seriesImageId: string;
    seriesImageSource: string;
}

export interface BlogData {
    id: string;
    title: string;
    slug: string;
    category: string;
    publishedAt: string;
    summary: string;
    blogImageId: string;
    blogImageSource: string;
}

export interface CategoryData {
    id: string;
    title: string;
    slug: string;
    categoryImageId: string;
    categoryImageSource: string;
}

// homepage products
export enum ProductSectionLayout {
    FOUR_IN_ONE = 'FOUR_IN_ONE', 
    FOUR_WITH_COVER = 'FOUR_WITH_COVER', 
    FOUR_IN_ROW = 'FOUR_IN_ROW',
    PROMOTION = 'PROMOTION'
}

export interface ProductSectionData {
    id: string;
    title: string;
    subtitle: string;
    imageId: string;
    imageSource: string;
    layout: ProductSectionLayout;
    products: ProductData[]
}

export interface ProductData {
    id: string;
    tagLine: string;
    title: string;
    slug: string;
    sellingPrice: number;
    discount: number;
    summary: string;
    productImageId: string;
    productImageSource: string;
    categoryTitle: string
    categorySlug: string
    seriesTitle: string
    seriesSlug: string
}

// homepage
export interface HomepageResType {
    homepageCarousel: HomepageCarousel[];
}

export interface Product {
    productId: string;
    productImageId: string;
    productImageSource: string;
    productPrice: number;
    productSlug: string;
    productTitle: string;
}

export interface HomepageCarousel {
    redirectTo: string;
    imageId: string;
    imageSource: string;
}
