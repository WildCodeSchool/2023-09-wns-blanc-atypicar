import React, { useState, FormEvent, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Category } from "../types/item";
import { errorToast, successToast } from "../components/Toast";
import { formattedDate } from "../utils/formatDates";
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

  // REFETCH
  const [isCategoryCreated, setIsCategoryCreated] = useState(false);

  useEffect(() => {
    if (isCategoryCreated) {
      refetch().then(({ data }) => {
        setCategories(data.getCategories);
        setIsCategoryCreated(false);
      });
    }
  }, [isCategoryCreated, refetch]);

  loading && <p>Chargement...Veuillez patienter</p>;
  error && <p>Erreur 🤯</p>;

  // DELETE
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleDeleteCategory = async (deleteCategoryId: number) => {
    try {
      await deleteCategory({ variables: { deleteCategoryId } });
      setIsCategoryCreated(true);
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
    const form: EventTarget = event.target;
    const formData = new FormData(form as HTMLFormElement);
    const formDataJson = Object.fromEntries(formData.entries());

    try {
      await createCategory({
        variables: {
          wording: formDataJson.wording,
        },
      });
      // window.location.reload();
      setIsCategoryCreated(true);
      successToast("Catégorie créée avec succès");
    } catch (error) {
      const errorMessage =
        (error as Error).message ||
        "Une erreur est survenue lors de la création de la catégorie.";
      errorToast(errorMessage);
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
      await updateCategory({
        variables: {
          wording: newWording,
          updateCategoryId: currentCategoryId,
        },
      });
      setIsCategoryCreated(true);
      successToast("Catégorie modifiée avec succès");
    } catch (error) {
      errorToast(
        "Une erreur est survenue lors de la modification de la catégorie."
      );
    }
  };

  //PAGINATION
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

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
            aria-label="Libellé de la nouvelle catégorie"
          />
          <Button
            size="lg"
            color="success"
            className="text-white ml-8"
            type="submit"
            aria-label="Créer la nouvelle catégorie"
          >
            Créer
          </Button>
        </div>
      </form>

      <h1 className="text-center text-lg mb-3">Catégories existantes: </h1>
      <Table
        aria-label="Example table with client side pagination"
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
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="role">ROLE</TableColumn>
          <TableColumn key="status">STATUS</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link
                  onPress={() => {
                    setCurrentCategoryId(item.id);
                    onOpen();
                  }}
                  color="primary"
                  aria-label={`Lien vers la catégorie ${item.wording}`}
                >
                  {item.wording}
                </Link>
                <Modal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  placement="top-center"
                  aria-label={`Modifier le libellé de la catégorie ${item.wording}`}
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
                              aria-label="Nouveau libellé de la catégorie"
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onPress={onClose}
                              type="submit"
                              aria-label="Valider la modification du libellé"
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
                {formattedDate(item.creationDate.toLocaleString())}
              </TableCell>
              <TableCell>
                <Tooltip
                  color="danger"
                  content="Supprimer la catégorie"
                  aria-label="Supprimer la catégorie"
                  disableAnimation
                >
                  <span
                    color="danger"
                    onClick={() => handleDeleteCategory(item.id)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    aria-label={`Supprimer la catégorie ${item.wording}`}
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
