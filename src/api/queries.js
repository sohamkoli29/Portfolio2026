import { QueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { api } from './endpoints.js';
import {
  mapAbout, mapProjects, mapSkills, mapExperience, mapServices, mapTestimonials,
  mapCertificates, mapAchievements, mapBlogPosts, mapBlogPost,
} from '../content/mappers.js';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60_000, gcTime: 60 * 60_000, retry: 1, refetchOnWindowFocus: false },
  },
});

const make = (key, fetcher, mapper) => () =>
  useQuery({ queryKey: key, queryFn: ({ signal }) => fetcher(signal).then(mapper) });

export const useAbout = make(['about'], api.about, mapAbout);
export const useProjects = make(['projects'], api.projects, mapProjects);
export const useSkills = make(['skills'], api.skills, mapSkills);
export const useExperience = make(['experience'], api.experience, mapExperience);
export const useServices = make(['services'], api.services, mapServices);
export const useTestimonials = make(['testimonials'], api.testimonials, mapTestimonials);
export const useCertificates = make(['certificates'], api.certificates, mapCertificates);
export const useAchievements = make(['achievements'], api.achievements, mapAchievements);
export const useBlogPosts = make(['blogs'], api.blogs, mapBlogPosts);

export const useBlogPost = (slug) =>
  useQuery({
    queryKey: ['blog', slug],
    queryFn: ({ signal }) => api.blog(slug, signal).then(mapBlogPost),
    enabled: Boolean(slug),
  });

export const useSendMessage = () => useMutation({ mutationFn: api.sendMessage });