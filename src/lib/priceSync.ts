import { compositions } from "@/pages/Catalog"

const API_URL = "https://functions.poehali.dev/59327913-bd5b-4b52-a0d6-3fc28ff5acb4"

function formatPrice(num: number): string {
  return num.toLocaleString("ru-RU") + " ₽"
}

async function fetchPrices(): Promise<{ id: number; subcategory: string; price: number }[] | null> {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) return null
    const data = await res.json()
    return data.items || null
  } catch {
    return null
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>(resolve => setTimeout(() => resolve(fallback), ms)),
  ])
}

export async function syncCatalogPrices(): Promise<void> {
  const items = await withTimeout(fetchPrices(), 3000, null)
  if (!items) return

  const priceMap = new Map<string, number>()
  items.forEach(it => priceMap.set(`${it.subcategory}|${it.id}`, it.price))

  Object.values(compositions).forEach(arr => {
    arr.forEach(item => {
      const key = `${item.subcategory ?? ""}|${item.id}`
      const newPrice = priceMap.get(key)
      if (newPrice !== undefined && newPrice !== item.priceNum) {
        item.priceNum = newPrice
        item.price = formatPrice(newPrice)
      }
    })
  })
}
