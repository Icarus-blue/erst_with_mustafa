import api from "@/lib/api";

export const fetchData = async (
  route: string,
  page: number,
  pageSize: number,
  query?: string,
  album_id?: number,
  album?: string,
  category?: string,
) => {
  try {
    const res = await api.server.GET(
      `${route}?page=${page}&pageSize=${pageSize}${
        query ? `&query=${query}` : ""
      }${album_id ? `&album_id=${album_id}` : ""}${
        album ? `&album_name=${album}` : ""
      }${category ? `&category=${category}` : ""}
      `,
      ""
    );
    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
