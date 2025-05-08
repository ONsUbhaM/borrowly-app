
export const FormatResult = (resp) => {
    let result = [];
    let finalResult = [];

    resp.forEach((element) => {
        const listingId = element.itemListing?.id;
        if(!result[listingId]){
            result[listingId] = {
                item: element.itemListing,
                images:[]
            }
        }
        if(element.itemImages){
            result[listingId].images.push(element.itemImages)
        }
    });

    result.forEach((element) => {
        finalResult.push({
            ...element.item,
            images: element.images
        })
    })

    return finalResult;
}
