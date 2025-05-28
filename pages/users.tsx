import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // או כל דף אחר שמתאים
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role !== "admin") {
          router.push("/"); // לאדמינים בלבד
          return;
        }

        const res = await fetch("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("שגיאה בטעינת המשתמשים");
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        console.error("שגיאה:", err);
        setError(err.message || "שגיאה לא ידועה");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7fa] to-white p-6 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">רשימת משתמשים</h1>

        {loading && (
          <div className="text-center text-lg font-medium">טוען משתמשים...</div>
        )}

        {error && (
          <div className="text-center text-red-600 font-medium">{error}</div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
            <table className="min-w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 border-b">#</th>
                  <th className="py-3 px-4 border-b">שם מלא</th>
                  <th className="py-3 px-4 border-b">אימייל</th>
                  <th className="py-3 px-4 border-b">טלפון</th>
                  <th className="py-3 px-4 border-b">כתובת</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 border-b transition-colors"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{user.full_name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className="py-2 px-4">{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                אין משתמשים להצגה
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
