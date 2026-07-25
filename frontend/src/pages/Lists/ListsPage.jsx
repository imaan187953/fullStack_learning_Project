import { useEffect, useState } from "react";
import { Plus, Lock, Globe } from "lucide-react";
import { Link } from "react-router-dom";

import {
    getMyLists,
    createList,
} from "../../services/list.service";

function ListsPage() {
    const [lists, setLists] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] =
        useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        visibility: "private",
    });

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        try {
            const response = await getMyLists();
            setLists(response.lists);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            await createList(form);

            setForm({
                name: "",
                description: "",
                visibility: "private",
            });

            setShowModal(false);

            fetchLists();
        } catch (error) {
            alert(error.response?.data?.message);
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
        <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">
                {/* Header */}

                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">
                            My Lists
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Organize your favorite movies and TV
                            shows.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 transition hover:bg-red-700"
                    >
                        <Plus size={18} />
                        New List
                    </button>
                </div>

                {/* Empty */}

                {lists.length === 0 ? (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-20 text-center">
                        <h2 className="text-2xl font-semibold">
                            No Lists Yet
                        </h2>

                        <p className="mt-3 text-gray-400">
                            Create your first list to start
                            collecting movies.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {lists.map((list) => (
                            <Link
                                key={list._id}
                                to={`/lists/${list._id}`}
                                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold">
                                        {list.name}
                                    </h2>

                                    {list.visibility ===
                                        "private" ? (
                                        <Lock
                                            size={18}
                                            className="text-gray-400"
                                        />
                                    ) : (
                                        <Globe
                                            size={18}
                                            className="text-green-400"
                                        />
                                    )}
                                </div>

                                <p className="mb-5 text-gray-400">
                                    {list.description ||
                                        "No description"}
                                </p>

                                <div className="text-sm text-gray-500">
                                    Created{" "}
                                    {new Date(
                                        list.createdAt
                                    ).toLocaleDateString()}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Modal */}

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
                        <div className="w-full max-w-md rounded-xl bg-zinc-900 p-8">
                            <h2 className="mb-6 text-2xl font-bold">
                                Create List
                            </h2>

                            <form
                                onSubmit={handleCreate}
                                className="space-y-5"
                            >
                                <input
                                    type="text"
                                    placeholder="List Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                                    required
                                />

                                <textarea
                                    rows="3"
                                    placeholder="Description"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                                />

                                <select
                                    value={form.visibility}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            visibility:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                                >
                                    <option value="private">
                                        Private
                                    </option>

                                    <option value="public">
                                        Public
                                    </option>
                                </select>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                        className="rounded-lg bg-zinc-700 px-5 py-2"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-red-600 px-5 py-2"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default ListsPage;