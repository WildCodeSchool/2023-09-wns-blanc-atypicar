import React, { useState, FormEvent, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Category } from "@/types/category";
import { errorToast, successToast } from "@/components/Toast";
import { formattedDate } from "@/utils/formatDates";
import { FaTrash } from "react-icons/fa";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

const GET_CATEGORIES = gql`
  query {
    getCategories {
      id
      wording
      creationDate
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation Mutation($deleteCategoryId: Float!) {
    deleteCategory(id: $deleteCategoryId)
  }
`;

const CREATE_CATEGORY = gql`
  mutation CreateCategory($wording: String!) {
    createCategory(wording: $wording) {
      wording
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation CreateCategory($wording: String!, $updateCategoryId: Float!) {
    updateCategory(wording: $wording, id: $updateCategoryId) {
      wording
    }
  }
`;

const CategoryPage = () => {
  // GET
  const [categories, setCategories] = useState<Category[]>([]);

  const { loading, error, refetch } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      setCategories(data.getCategories);
    },
  });

  loading && <p>Chargement...Veuillez patienter</p>;
  error && <p>Erreur 🤯</p>;

  // DELETE
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleDeleteCategory = async (deleteCategoryId: number) => {
    try {
      await deleteCategory({ variables: { deleteCategoryId } });
      setCategories(
        categories.filter((category) => category.id !== deleteCategoryId)
      );
      successToast("La catégorie a été supprimée avec succès.");
    } catch (error) {
      console.error("Erreur sur la suppression de la catégorie:", error);
      errorToast("Erreur sur la suppression de la catégorie.");
    }
  };

  // CREATE
  const [createCategory] = useMutation(CREATE_CATEGORY);

  const handleCreateCategory = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    console.log(event);
    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    try {
      await createCategory({
        variables: {
          wording: formDataJson.wording,
        },
      });
      await refetch();
      successToast("Catégorie créée avec succès");
    } catch (error) {
      const errorMessage = (error as Error).message || "Une erreur est survenue lors de la création de la catégorie.";
      errorToast(
      errorMessage
      );
    }
  };

  //UPDATE
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [newWording, setNewWording] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const handleUpdateCategory = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      console.log(newWording, currentCategoryId);
      await updateCategory({
        variables: {
          wording: newWording,
          updateCategoryId: currentCategoryId,
        },
      });
      await refetch();
      successToast("Catégorie modifiée avec succès");
    } catch (error) {
      errorToast(
        "Une erreur est survenue lors de la modification de la catégorie."
      );
    }
  };

  //PAGINATION
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(categories.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return categories.slice(start, end);
  }, [page, categories]);

  return (
    <div className="flex-column justify-center mt-10 w-4/5 mx-auto">
      <form onSubmit={handleCreateCategory} className="mb-2 w-3/4 mx-auto">
        <label htmlFor="newCategory" className="text-lg">
          Créer une nouvelle catégorie:
        </label>
        <div className="flex">
          <Input
            variant="bordered"
            size="sm"
            type="text"
            id="wording"
            name="wording"
          />
          <Button
            size="lg"
            color="success"
            className="text-white ml-8"
            type="submit"
          >
            Créer
          </Button>
        </div>
      </form>

      <h1 className="text-center text-lg mb-3">Catégories existantes: </h1>
      <Table
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn className="text-lg">Libellé</TableColumn>
          <TableColumn className="text-lg">Date de création</TableColumn>
          <TableColumn className="text-lg">Action</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <Link
                  onPress={() => {
                    setCurrentCategoryId(category.id);
                    onOpen();
                  }}
                  color="primary"
                >
                  {category.wording}
                </Link>
                <Modal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  placement="top-center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Modifier le Libellé:
                        </ModalHeader>
                        <form onSubmit={handleUpdateCategory}>
                          <ModalBody>
                            <Input
                              autoFocus
                              placeholder="écrire ici..."
                              variant="bordered"
                              value={newWording}
                              onChange={(event) =>
                                setNewWording(event.target.value)
                              }
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onPress={onClose}
                              type="submit"
                            >
                              Modifier
                            </Button>
                          </ModalFooter>
                        </form>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </TableCell>
              <TableCell>
                {formattedDate(category.creationDate.toLocaleString())}
              </TableCell>
              <TableCell>
                <Tooltip color="danger" content="Supprimer la catégorie">
                  <span
                    color="danger"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <FaTrash />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryPage;
