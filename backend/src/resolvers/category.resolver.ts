import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/category";
import * as categoryService from "../services/category.service";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  getCategories(): Promise<Category[]> {
    return categoryService.findCategories();
  }

  @Mutation(() => Category)
  createCategory(@Arg("wording") wording: string): Promise<Category> {
    return categoryService.createCategory(wording);
  }

  @Mutation(() => Category)
  updateCategory(
    @Arg("id") id: number,
    @Arg("wording") wording: string
  ): Promise<Category | Error> {
    return categoryService.updateCategory(id, wording);
  }

  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: number): Promise<string> {
    const result = await categoryService.deleteCategory(id);
    return "OK";
  }
}
