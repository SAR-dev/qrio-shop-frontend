import { CategoriesResponse, ImagesResponse, ProductsResponse, SeriesResponse, ShippingMethodsResponse } from "./pocketbase";

// product details
export type TexpandProductDetailsResType = ProductsResponse & {
    expand: {
        categories: CategoriesResponse;
        series: SeriesResponse;
        images: ImagesResponse[];
        shippingMethods: ShippingMethodsResponse;
    };
};

// cart products
export interface CartProductResType {
    cartProducts: CartProduct[]
}

export interface CartProduct {
    productId: string
    productTitle: string
    productAmount: number
    productDiscount: number
    categorySlug: string
    seriesSlug: string
    cartId: string
    productSlug: string
    productSellingPrice: number
    productImageId: string
    productImageSource: string
    categoryTitle: string
    seriesTitle: string
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
export interface TrendingProductResType {
    trendingProducts: ProductData[];
    discountProducts: ProductData[];
    promotedProducts: ProductData[];
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
    featuredCategories: FeaturedCategory[];
    featuredSeries: FeaturedSeries[];
    homepageCarousel: HomepageCarousel[];
}

export interface FeaturedCategory {
    tagLine: string;
    categoryId: string;
    categoryImageId: string;
    categoryImageSource: string;
    categorySlug: string;
    categoryTitle: string;
    products: Product[];
}

export interface FeaturedSeries {
    tagLine: string;
    seriesId: string;
    seriesImageId: string;
    seriesImageSource: string;
    seriesSlug: string;
    seriesTitle: string;
    products: Product[];
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
    title1: string;
    title2: string;
    subtitle: string;
    buttonText: string;
    redirectTo: string;
    imageId: string;
    imageSource: string;
}
