import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/category";
import { CategoryService } from "../services/category.service";

@Resolver(Category)
export class CategoryResolver {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return this.categoryService.findCategories();
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("wording") wording: string
  ): Promise<Category | Error> {
    return this.categoryService.createCategory(wording);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg("id") id: number,
    @Arg("wording") wording: string
  ): Promise<Category | Error> {
    return this.categoryService.updateCategory(id, wording);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: number): Promise<boolean> {
    await this.categoryService.deleteCategory(id);
    return true;
  }

  @Query(() => [Category])
  async getRandomCategories(): Promise<Category[]> {
    return this.categoryService.getRandomCategories();
  }
}
