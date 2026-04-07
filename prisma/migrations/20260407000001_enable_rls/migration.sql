-- Enable Row Level Security on all public tables
-- This blocks all PostgREST (Supabase REST API) access.
-- Prisma uses the service_role connection which bypasses RLS, so app behaviour is unchanged.

ALTER TABLE "User"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Guest"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewToken"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WeddingReview"     ENABLE ROW LEVEL SECURITY;
