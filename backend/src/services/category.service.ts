import { DeleteResult } from "typeorm";
import { Category } from "../entities/category";

export const findCategories = async (): Promise<Category[]> => {
  return Category.find();
};

export const createCategory = async (wording: string): Promise<Category> => {
  const category = new Category();
  category.wording = wording;
  return category.save();
};

export const deleteCategory = async (id: number): Promise<DeleteResult> => {
  return Category.delete({ id });
};

export const updateCategory = async (
  id: number,
  wording: string
): Promise<Category | Error> => {
  const category = await Category.findOne({ where: { id } });
  if (!category) {
    throw new Error("La catégorie est introuvable.");
  }
  category.wording = wording;
  return category.save();
};
