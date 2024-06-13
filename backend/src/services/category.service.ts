import { DeleteResult, DataSource } from "typeorm";
import { Category } from "../entities/category";
import { dataSource } from "../config/db";

export class CategoryService {
  private categoryRepository: any;

  constructor() {
    this.categoryRepository = dataSource.getRepository(Category);
  }

  findCategories = async (): Promise<Category[]> => {
    return Category.find();
  };

  createCategory = async (wording: string): Promise<Category | Error> => {
    await this.checkCategoryWording(wording);
    const category = new Category();
    category.wording = wording;
    return category.save();
  };

  deleteCategory = async (id: number): Promise<DeleteResult> => {
    return Category.delete({ id });
  };

  updateCategory = async (
    id: number,
    wording: string
  ): Promise<Category | Error> => {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      throw new Error("La catégorie est introuvable.");
    }
    if (wording) {
      await this.checkCategoryWording(wording);
    }
    category.wording = wording;
    return category.save();
  };

  checkCategoryWording = async (wording: string): Promise<void | Error> => {
    if (wording.length < 3) {
      throw new Error("Le libellé doit contenir au moins 3 caractères.");
    }

    const existingCategory = await this.categoryRepository.findOne({
      where: { wording },
    });

    if (existingCategory) {
      throw new Error("Une catégorie avec ce libellé existe déjà.");
    }
  };

  getRandomCategories = async (): Promise<Category[]> => {
    try {
      const randomCategory = await Category.find({
        take: 10,
      });

      if (!randomCategory) {
        console.log("Pas de catégories pour l'instant ! :(");
      }
      return randomCategory;
    } catch (error) {
      throw new Error(`Erreur sur la recherche de catégories : ${error}`);
    }
  };
}
