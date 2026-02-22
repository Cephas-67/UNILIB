import { useState, useEffect, useCallback } from "react";

export type ActivityType = "download" | "favorite" | "upload" | "project";

export interface Activity {
    type: ActivityType;
    text: string;
    date: string; // ISO string
}

const getKey = (email: string) => `unilib_activities_${email}`;

export const useUserActivities = (email: string | undefined) => {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        if (!email) return;
        const raw = localStorage.getItem(getKey(email));
        if (raw) {
            try {
                setActivities(JSON.parse(raw));
            } catch {
                setActivities([]);
            }
        } else {
            setActivities([]);
        }
    }, [email]);

    const addActivity = useCallback(
        (activity: Activity) => {
            if (!email) return;
            setActivities((prev) => {
                // Keep the 20 most recent activities
                const next = [activity, ...prev].slice(0, 20);
                localStorage.setItem(getKey(email), JSON.stringify(next));
                return next;
            });
        },
        [email]
    );

    return { activities, addActivity };
};
