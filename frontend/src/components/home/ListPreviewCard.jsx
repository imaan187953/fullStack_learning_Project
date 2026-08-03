import { useEffect, useState } from "react";
import {
    Lock,
    Globe,
    ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getListItems } from "../../services/list.service";

function ListPreviewCard({ list }) {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadItems = async () => {

            try {

                const response = await getListItems(list._id);

                setItems(response.items || []);

            } catch (error) {

                console.error(
                    `Failed to load items for ${list.name}:`,
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadItems();

    }, [list._id, list.name]);


    return (

        <div
            onClick={() => navigate(`/lists/${list._id}`)}
            className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-zinc-800"
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold text-white">
                    {list.name}
                </h3>

                {list.visibility === "public" ? (
                    <Globe
                        size={18}
                        className="text-green-500"
                    />
                ) : (
                    <Lock
                        size={18}
                        className="text-zinc-500"
                    />
                )}

            </div>


            {/* Description */}

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
                {list.description || "No description provided."}
            </p>


            {/* Movie Preview */}

            <div className="mt-5">

                {loading ? (

                    <div className="flex gap-2">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-28 w-20 animate-pulse rounded-lg bg-zinc-800"
                            />
                        ))}

                    </div>

                ) : items.length > 0 ? (

                    <div className="flex gap-2 overflow-hidden">

                        {items.slice(0, 4).map((item) => (

                            <img
                                key={item._id}
                                src={
                                    item.media?.posterPath
                                        ? `https://image.tmdb.org/t/p/w200${item.media.posterPath}`
                                        : "https://placehold.co/100x150?text=No+Poster"
                                }
                                alt={
                                    item.media?.title ||
                                    "Movie"
                                }
                                className="h-28 w-20 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                        ))}

                    </div>

                ) : (

                    <div className="flex h-28 items-center justify-center rounded-lg bg-zinc-800">

                        <p className="text-sm text-zinc-500">
                            No items yet
                        </p>

                    </div>

                )}

            </div>


            {/* Footer */}

            <div className="mt-6 flex items-center justify-between">

                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                    {items.length} Items
                </span>

                <ChevronRight
                    size={20}
                    className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-red-500"
                />

            </div>

        </div>

    );
}

export default ListPreviewCard;