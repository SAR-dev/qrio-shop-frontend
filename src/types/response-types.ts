export interface HomepageResType {
    featuredCategories: FeaturedCategory[];
    featuredSeries:     FeaturedSeries[];
    homepageCarousel:   HomepageCarousel[];
}

export interface FeaturedCategory {
    categoryId:          string;
    categoryImageId:     string;
    categoryImageSource: string;
    categorySlug:        string;
    categoryTitle:       string;
    products:            Product[];
}

export interface FeaturedSeries {
    seriesId:          string;
    seriesImageId:     string;
    seriesImageSource: string;
    seriesSlug:        string;
    seriesTitle:       string;
    products:          Product[];
}

export interface Product {
    productId:          string;
    productImageId:     string;
    productImageSource: string;
    productPrice:       number;
    productSlug:        string;
    productTitle:       string;
}

export interface HomepageCarousel {
    title1:      string;
    title2:      string;
    subtitle:    string;
    buttonText:  string;
    redirectTo:  string;
    imageId:     string;
    imageSource: string;
}
