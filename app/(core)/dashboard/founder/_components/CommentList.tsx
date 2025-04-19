import { SharkComment } from "../_data/firebaseService";

interface SharkCommentCardProps {
  comment: SharkComment;
  index: number;
}

export function CommentsList({ comment }: SharkCommentCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-900 dark:text-white">
          {comment.sharkName}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(comment.timestamp).toLocaleString()}
        </p>
      </div>
      <p className="text-gray-800 dark:text-gray-200">{comment.comment}</p>
    </div>
  );
}
