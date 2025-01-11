'use client'
import { getUserInfo } from "@/actions/auth";
import { useQuery } from "@tanstack/react-query";

export const useQueryUser = () => {
    const { data } = useQuery({
        queryKey: ['user-profile'],
        queryFn: () => getUserInfo(),
    });
    return { user: data }
}