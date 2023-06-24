import { Item, createItem, Shop, ItemNames } from "./app";

describe("Normal item", () => {
  it("should decrease in quality before sell date", () => {
    const item = createItem("Backpack", 5, 20);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(19);
  });

  it("should decrease in quality twice as fast after sell date", () => {
    const item = createItem("Backpack", 0, 20);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(18);
  });
});

describe("Aged brie", () => {
  it("should increase in quality before sell date", () => {
    const item = createItem(ItemNames.Brie, 5, 5);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.sellIn).toEqual(4);
    expect(item.quality).toEqual(6);
  });
  it("should not have quality higher than 50", () => {
    const item = createItem(ItemNames.Brie, 2, 50);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toEqual(50);
  });
  it("should increase in quality twice as fast after sell date", () => {
    const item = createItem(ItemNames.Brie, 0, 20);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(22);
  });
  it("should not have quality higher than 50 after sell date", () => {
    const item = createItem(ItemNames.Brie, 0, 49);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(50);
  });
});

describe("Sulfuras", () => {
  it("should not decrease nor increase in quality before sell date", () => {
    const item = createItem(ItemNames.Sulfuras, 5, 27);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(27);
  });
  it("should not decrease nor increase in quality on sell date", () => {
    const item = createItem(ItemNames.Sulfuras, 1, 27);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(27);
  });
  it("should not decrease nor increase in quality after sell date", () => {
    const item = createItem(ItemNames.Sulfuras, -1, 27);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(27);
  });
});

describe("Backstage pass", () => {
  it("should increase in quality before sell date", () => {
    const item = createItem(ItemNames.BackstagePass, 15, 20);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(21);
  });
  it("should increase in quality before sell date but not over 50", () => {
    const item = createItem(ItemNames.BackstagePass, 15, 50);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(50);
  });
  it("should increase in quality by 2 if there are 10 days or less left", () => {
    const item = createItem(ItemNames.BackstagePass, 10, 20);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(22);
  });
  it("should increase in quality by 2 - 10 days or less before sell date but not over 50", () => {
    const item = createItem(ItemNames.BackstagePass, 10, 49);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(50);
  });
  it("should increase in quality by 3 if there are 5 or less days left", () => {
    const item = createItem(ItemNames.BackstagePass, 5, 20);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(23);
  });
  it("should increase in quality by 3 - 5 days or less before sell date but not over 50", () => {
    const item = createItem(ItemNames.BackstagePass, 5, 49);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(50);
  });
  it("should set quality to 0 after the concert", () => {
    const item = createItem(ItemNames.BackstagePass, 0, 20);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(0);
  });
});

describe("Conjured Item", () => {
  it("should decrease in quality by 2 each day", () => {
    const item = createItem("Conjured Wand", 5, 10);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(8);
  });

  it("should decrease the quality by 4 when sell in passed", () => {
    const item = createItem("Conjured Cup", 0, 10);
    const shop = new Shop([item]);

    shop.updateQuality();

    expect(item.quality).toBe(6);
  });
});
