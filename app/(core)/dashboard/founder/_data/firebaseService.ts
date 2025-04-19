import { ref, get, child } from "firebase/database";
import { db } from "@/lib/firebase";

export interface SharkComment {
  id: string;
  pitchId: string;
  sharkName: string;
  comment: string;
  timestamp: number;
}

export async function getCommentsByPitchId(pitchId: string): Promise<SharkComment[]> {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "comments"));
    if (snapshot.exists()) {
      const allComments = snapshot.val();
      const filtered = Object.entries(allComments)
        .map(([id, comment]: any) => ({
          id,
          ...comment
        }))
        .filter((comment: SharkComment) => comment.pitchId === pitchId);
      return filtered;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}