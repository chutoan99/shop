import { ShopMallModel } from '../model'

export const formatShopMall = (
	shopMallList: ShopMallModel[]
): ShopMallModel[][] => {
	const ShopMallArray: any[][] = []
	const lastIdx = shopMallList.length - 1

	for (let i = 0; i < lastIdx; i += 2) {
		const obj1 = {
			id: shopMallList[i]?.id,
			image: shopMallList[i]?.image,
			url: shopMallList[i]?.url,
			promo_text: shopMallList[i]?.promo_text,
			created_at: shopMallList[i]?.created_at,
			updated_at: shopMallList[i]?.updated_at
		}
		const obj2 = {
			id: shopMallList[i + 1]?.id,
			image: shopMallList[i + 1]?.image,
			url: shopMallList[i + 1]?.url,
			promo_text: shopMallList[i + 1]?.promo_text,
			created_at: shopMallList[i + 1]?.created_at,
			updated_at: shopMallList[i + 1]?.updated_at
		}

		if (!isEmptyObject(obj1) || !isEmptyObject(obj2)) {
			ShopMallArray.push([obj1, obj2])
		}
	}

	// If the last object is not empty, add it as a single item to the result array
	if (!isEmptyObject(shopMallList[lastIdx])) {
		ShopMallArray.push([shopMallList[lastIdx]])
	}

	return ShopMallArray
}

const isEmptyObject = (obj: any) => {
	return Object.keys(obj).length === 0
}
