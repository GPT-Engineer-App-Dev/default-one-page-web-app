import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Reactions // table: reactions
    id: number
    post_id: number // foreign key to Posts
    user_id: string
    emoji: string

Documents // table: documents
    id: number
    student_id: number // foreign key to Students
    title: string
    content: string
    created_at: string

Posts // table: posts
    id: number
    name: string
    body: string
    created_at: string
    author_id: string
    likes_count: number

Classes // table: classes
    id: number
    name: string
    description: string
    created_at: string

Students // table: students
    id: number
    first_name: string
    last_name: string
    email: string
    created_at: string

ClassStudents // table: class_students
    class_id: number // foreign key to Classes
    student_id: number // foreign key to Students

*/

// Hooks for Reactions
export const useReactions = () => useQuery({
    queryKey: ['reactions'],
    queryFn: () => fromSupabase(supabase.from('reactions').select('*')),
});
export const useAddReaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newReaction) => fromSupabase(supabase.from('reactions').insert([newReaction])),
        onSuccess: () => {
            queryClient.invalidateQueries('reactions');
        },
    });
};

// Hooks for Documents
export const useDocuments = () => useQuery({
    queryKey: ['documents'],
    queryFn: () => fromSupabase(supabase.from('documents').select('*')),
});
export const useAddDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDocument) => fromSupabase(supabase.from('documents').insert([newDocument])),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};

// Hooks for Posts
export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});
export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([newPost])),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

// Hooks for Classes
export const useClasses = () => useQuery({
    queryKey: ['classes'],
    queryFn: () => fromSupabase(supabase.from('classes').select('*')),
});
export const useAddClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newClass) => fromSupabase(supabase.from('classes').insert([newClass])),
        onSuccess: () => {
            queryClient.invalidateQueries('classes');
        },
    });
};

// Hooks for Students
export const useStudents = () => useQuery({
    queryKey: ['students'],
    queryFn: () => fromSupabase(supabase.from('students').select('*')),
});
export const useAddStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newStudent) => fromSupabase(supabase.from('students').insert([newStudent])),
        onSuccess: () => {
            queryClient.invalidateQueries('students');
        },
    });
};

// Hooks for ClassStudents
export const useClassStudents = () => useQuery({
    queryKey: ['class_students'],
    queryFn: () => fromSupabase(supabase.from('class_students').select('*')),
});
export const useAddClassStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newClassStudent) => fromSupabase(supabase.from('class_students').insert([newClassStudent])),
        onSuccess: () => {
            queryClient.invalidateQueries('class_students');
        },
    });
};