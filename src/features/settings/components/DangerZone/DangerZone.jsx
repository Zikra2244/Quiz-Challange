import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertTriangle,
  FiTrash2,
  FiLogOut,
  FiX,
  FiDownload,
} from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";

const DangerZone = ({ onDeleteAccount, onLogout, onExportData }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") return;

    setIsDeleting(true);
    try {
      await onDeleteAccount();
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-red-400 mb-2 flex items-center">
          <FiAlertTriangle className="mr-2" />
          Danger Zone
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Irreversible and destructive actions for your account
        </p>
      </div>

      <div className="p-6 glass rounded-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiDownload className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">
                Export Your Data
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Download all your quiz history, achievements, and profile data
              </p>
              <Button
                variant="outline"
                onClick={onExportData}
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
              >
                <FiDownload className="mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 glass rounded-lg border border-yellow-500/20">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <FiLogOut className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">
                Logout from Account
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Sign out from your current session. You can login again anytime.
              </p>
              <Button
                variant="outline"
                onClick={onLogout}
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                <FiLogOut className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 glass rounded-lg border border-red-500/20">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <FiTrash2 className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white mb-1">
              Delete Account
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>

            {!showDeleteConfirm ? (
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <FiTrash2 className="mr-2" />
                Delete Account
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 bg-red-500/10 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <FiAlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white mb-2">
                        <span className="font-bold">Warning:</span> This will
                        permanently delete:
                      </p>
                      <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                        <li>Your profile and personal information</li>
                        <li>All quiz history and statistics</li>
                        <li>All achievements and XP</li>
                        <li>Leaderboard rankings</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Type <span className="font-mono text-red-400">DELETE</span>{" "}
                    to confirm
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder="DELETE"
                      className="flex-1 px-4 py-2 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Button
                      variant="primary"
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmation !== "DELETE" || isDeleting}
                      loading={isDeleting}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      {isDeleting ? "Deleting..." : "Delete Permanently"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmation("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
