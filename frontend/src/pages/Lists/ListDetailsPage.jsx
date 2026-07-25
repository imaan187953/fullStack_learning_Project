import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getListById } from "../../services/list.service";

import ListHeader from "../../components/lists/ListHeader";

import { getListItems, removeItemFromList, deleteList } from "../../services/list.service";

import ListMediaGrid from "../../components/lists/ListMediaGrid";

import EditListModal from "../../components/lists/EditListModal";
import { updateList } from "../../services/list.service";
import DeleteListModal from "../../components/lists/DeleteListModal";


function ListDetailPage() {
    const { id } = useParams();

    const [list, setList] = useState(null);

    const [loading, setLoading] = useState(true);

    const [items, setItems] = useState([]);

    const [showEditModal, setShowEditModal] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const [deleting, setDeleting] =
        useState(false);

    useEffect(() => {
        fetchList();
    }, [id]);

    const fetchList = async () => {
        try {
            const [listResponse, itemsResponse] =
                await Promise.all([
                    getListById(id),
                    getListItems(id),
                ]);

            setList(listResponse.list);

            setItems(itemsResponse.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (item) => {
        try {
            await removeItemFromList(
                id,
                item._id
            );

            setItems((prev) =>
                prev.filter(
                    (current) => current._id !== item._id
                )
            );

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to remove item."
            );
        }
    };

    const handleDeleteList = async () => {
        try {

            setDeleting(true);

            await deleteList(id);

            navigate("/lists");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete list."
            );

        } finally {

            setDeleting(false);

        }
    };

    const handleUpdate = async (form) => {
        try {
            setSaving(true);

            await updateList(id, form);

            await fetchList();

            setShowEditModal(false);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update list."
            );

        } finally {

            setSaving(false);

        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <ListHeader
                    list={list}
                    items={items}
                    onEdit={() => setShowEditModal(true)}
                    onDelete={() => setShowDeleteModal(true)}
                />


                <div className="mt-12">
                    <ListMediaGrid
                        items={items}
                        onRemove={handleRemoveItem}
                    />
                </div>

                <EditListModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    list={list}
                    onSave={handleUpdate}
                    loading={saving}
                />

                <DeleteListModal
                    isOpen={showDeleteModal}
                    onClose={() =>
                        setShowDeleteModal(false)
                    }
                    onConfirm={handleDeleteList}
                    loading={deleting}
                    listName={list.name}
                />
            </div>
        </main>
    );
}

export default ListDetailPage;