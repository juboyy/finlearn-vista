-- Fix linter WARN 3: move extension out of public schema
create schema if not exists extensions;

-- Move vector extension objects to extensions schema
alter extension vector set schema extensions;

-- Fix linter WARN 1-2: set immutable search_path on functions (non-extension owned)
alter function public.hybrid_search(text, extensions.vector, integer, double precision, double precision, integer)
  set search_path to public, extensions;

alter function public.notify_message_deletion()
  set search_path to public;