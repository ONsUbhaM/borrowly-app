import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const ItemListing = pgTable("itemListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(),
  tagline: varchar("tagline"),
  rentalprice: varchar("rentalprice").notNull(),
  catagory: varchar("catagory").notNull(),
  condition: varchar("condition").notNull(),
  year: varchar("year").notNull(),
  offerType: varchar("offerType"),
  listingDescription: varchar("listingDescription").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName").notNull().default('Debarpan'),
  userImageUrl: varchar("userImageUrl").default('https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'),
  color: varchar("color").notNull(),
  postedOn: varchar("postedOn"),
});

export const ItemImages = pgTable("itemImages", {
  id: serial("id").primaryKey(),
  imageUrl: varchar("imageUrl").notNull(),
  itemListingId: integer("itemListingId")
    .notNull()
    .references(() => ItemListing.id),
});