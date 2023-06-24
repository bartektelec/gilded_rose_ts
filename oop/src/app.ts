export const ItemNames = {
  Brie: "Aged Brie",
  BackstagePass: "Backstage passes to a TAFKAL80ETC concert",
  Sulfuras: "Sulfuras, Hand of Ragnaros",
} as const;

const MAX_QUALITY = 50 as const;
const MIN_QUALITY = 0 as const;

export const createItem = (
  name: string,
  sellIn: number,
  quality: number
): Item => {
  if (name.toLowerCase().includes("conjured")) {
    return new ConjuredItem(name, sellIn, quality);
  }

  if (name === ItemNames.Brie) return new AgedBrieItem(sellIn, quality);
  if (name === ItemNames.Sulfuras) return new SulfurasItem(sellIn, quality);
  if (name === ItemNames.BackstagePass)
    return new BackstagePassItem(sellIn, quality);

  return new Item(name, sellIn, quality);
};

class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

  updateSellIn() {
    this.sellIn -= 1;
  }

  updateQuality() {
    const step = this.sellIn >= 0 ? 1 : 2;

    this.quality = Math.max(MIN_QUALITY, this.quality - step);
  }

  tick() {
    this.updateSellIn();
    this.updateQuality();
  }
}

class ConjuredItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }

  override updateQuality() {
    const step = this.sellIn >= 0 ? 2 : 4;

    this.quality = Math.max(MIN_QUALITY, this.quality - step);
  }
}

class AgedBrieItem extends Item {
  constructor(sellIn: number, quality: number) {
    super(ItemNames.Brie, sellIn, quality);
  }

  override updateQuality() {
    const step = this.sellIn >= 0 ? 1 : 2;

    this.quality = Math.min(MAX_QUALITY, this.quality + step);
  }
}

class SulfurasItem extends Item {
  constructor(sellIn: number, quality: number) {
    super(ItemNames.Sulfuras, sellIn, quality);
  }

  override updateQuality() {}
  override updateSellIn() {}
}

class BackstagePassItem extends Item {
  constructor(sellIn: number, quality: number) {
    super(ItemNames.BackstagePass, sellIn, quality);
  }

  override updateQuality() {
    // increases in value
    // if 10 days or less increases by 2
    // if 5 days or less increases by 3
    // if 0 days sets quality o 0

    if (this.sellIn <= 0) {
      this.quality = 0;
      return;
    }

    let step = 1;
    if (this.sellIn <= 10) step++;
    if (this.sellIn <= 5) step++;

    this.quality = Math.min(MAX_QUALITY, this.quality + step);
  }
}

class Shop {
  constructor(public items: Item[]) {}

  updateQuality() {
    this.items.forEach((item) => item.tick());

    return this.items;
  }
}

export { Item, Shop };
