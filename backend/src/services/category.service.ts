import { DeleteResult } from "typeorm";
import { Category } from "../entities/category";

export const findCategories = async (): Promise<Category[]> => {
  return Category.find();
};

export const createCategory = async (wording: string): Promise<Category> => {
  // wording verification
  if (wording.length < 2) {
    throw new Error("Le libellé doit contenir au moins 3 caractères.");
  }
  const category = new Category();
  category.wording = wording;
  return category.save();
};

export const deleteCategory = async (id: number): Promise<DeleteResult> => {
  const result = await Category.delete({ id });
  if (result.affected === 0) {
    throw new Error("Catégorie non trouvée.");
  }
  return result;
};

export const updateCategory = async (
  id: number,
  wording: string
): Promise<Category | Error> => {
  const category = await Category.findOne({ where: { id } });
  if (!category) {
    throw new Error("La catégorie est introuvable.");
  }
  // wording verification
  if (wording.length < 2) {
    throw new Error("Le libellé doit contenir au moins 3 caractères.");
  }
  category.wording = wording;
  return category.save();
};
