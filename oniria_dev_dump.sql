-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: get_user_context(jsonb); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_user_context(params jsonb) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  user_id uuid;
begin
  user_id := (params->>'user_id')::uuid;

  return json_build_object(
    'themes', (
      select coalesce(json_agg(theme_data order by (theme_data->>'count')::int desc), '[]'::json)
      from (
        select json_build_object(
          'label', pt.label,
          'count', count(dt.dream_id)
        ) as theme_data
        from public.profile_theme pt
        left join public.dream_theme dt on dt.theme_id = pt.id
        and dt.dream_id in (
          select id from public.dream_node
          where profile_id = user_id
          order by creation_date desc
          limit 20
        )
        where pt.profile_id = user_id
        group by pt.id, pt.label, pt.last_updated
        having count(dt.dream_id) > 0
      ) themes_subquery
    ),
    'people', (
      select coalesce(json_agg(people_data order by (people_data->>'count')::int desc), '[]'::json)
      from (
        select json_build_object(
          'label', pp.label,
          'count', count(dp.dream_id)
        ) as people_data
        from public.profile_person pp
        left join public.dream_person dp on dp.person_id = pp.id
        and dp.dream_id in (
          select id from public.dream_node
          where profile_id = user_id
          order by creation_date desc
          limit 20
        )
        where pp.profile_id = user_id
        group by pp.id, pp.label, pp.last_updated
        having count(dp.dream_id) > 0
      ) people_subquery
    ),
    'emotions', (
      select coalesce(json_agg(emotion_data order by (emotion_data->>'count')::int desc), '[]'::json)
      from (
        select json_build_object(
          'label', pec.label,
          'count', count(de.dream_id)
        ) as emotion_data
        from public.profile_emotion_context pec
        left join public.dream_emotion_context de on de.emotion_context_id = pec.id
        and de.dream_id in (
          select id from public.dream_node
          where profile_id = user_id
          order by creation_date desc
          limit 20
        )
        where pec.profile_id = user_id
        group by pec.id, pec.label, pec.last_updated
        having count(de.dream_id) > 0
      ) emotions_subquery
    ),
    'locations', (
      select coalesce(json_agg(location_data order by (location_data->>'count')::int desc), '[]'::json)
      from (
        select json_build_object(
          'label', pl.label,
          'count', count(dl.dream_id)
        ) as location_data
        from public.profile_location pl
        left join public.dream_location dl on dl.location_id = pl.id
        and dl.dream_id in (
          select id from public.dream_node
          where profile_id = user_id
          order by creation_date desc
          limit 20
        )
        where pl.profile_id = user_id
        group by pl.id, pl.label, pl.last_updated
        having count(dl.dream_id) > 0
      ) locations_subquery
    )
  );
end;
$$;


ALTER FUNCTION public.get_user_context(params jsonb) OWNER TO postgres;

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into public.profile (id, date_of_birth)
  values (
    new.id,
    nullif(new.raw_user_meta_data->>'date_of_birth', '')::date
  );
  return new;
end;
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: lock_top_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket text;
    v_top text;
BEGIN
    FOR v_bucket, v_top IN
        SELECT DISTINCT t.bucket_id,
            split_part(t.name, '/', 1) AS top
        FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        WHERE t.name <> ''
        ORDER BY 1, 2
        LOOP
            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));
        END LOOP;
END;
$$;


ALTER FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- Name: objects_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    -- NEW - OLD (destinations to create prefixes for)
    v_add_bucket_ids text[];
    v_add_names      text[];

    -- OLD - NEW (sources to prune)
    v_src_bucket_ids text[];
    v_src_names      text[];
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NULL;
    END IF;

    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)
    WITH added AS (
        SELECT n.bucket_id, n.name
        FROM new_rows n
        WHERE n.name <> '' AND position('/' in n.name) > 0
        EXCEPT
        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''
    ),
    moved AS (
         SELECT o.bucket_id, o.name
         FROM old_rows o
         WHERE o.name <> ''
         EXCEPT
         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''
    )
    SELECT
        -- arrays for ADDED (dest) in stable order
        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        -- arrays for MOVED (src) in stable order
        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),
        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )
    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;

    -- Nothing to do?
    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN
        RETURN NULL;
    END IF;

    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks
    DECLARE
        v_all_bucket_ids text[];
        v_all_names text[];
    BEGIN
        -- Combine source and destination arrays for consistent lock ordering
        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');
        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');

        -- Single lock call ensures consistent global ordering across all transactions
        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN
            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);
        END IF;
    END;

    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources
    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN
        WITH candidates AS (
            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)
            WHERE name <> ''
        )
        INSERT INTO storage.prefixes (bucket_id, name)
        SELECT c.bucket_id, c.name
        FROM candidates c
        ON CONFLICT DO NOTHING;
    END IF;

    -- 4) Prune source prefixes bottom-up for OLD−NEW
    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN
        -- re-entrancy guard so DELETE on prefixes won't recurse
        IF current_setting('storage.gc.prefixes', true) <> '1' THEN
            PERFORM set_config('storage.gc.prefixes', '1', true);
        END IF;

        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);
    END IF;

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_update_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_level_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_level_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Set the new level
        NEW."level" := "storage"."get_level"(NEW."name");
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_level_trigger() OWNER TO supabase_storage_admin;

--
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.prefixes_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    sort_col text;
    sort_ord text;
    cursor_op text;
    cursor_expr text;
    sort_expr text;
BEGIN
    -- Validate sort_order
    sort_ord := lower(sort_order);
    IF sort_ord NOT IN ('asc', 'desc') THEN
        sort_ord := 'asc';
    END IF;

    -- Determine cursor comparison operator
    IF sort_ord = 'asc' THEN
        cursor_op := '>';
    ELSE
        cursor_op := '<';
    END IF;
    
    sort_col := lower(sort_column);
    -- Validate sort column  
    IF sort_col IN ('updated_at', 'created_at') THEN
        cursor_expr := format(
            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE "C") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',
            sort_col, cursor_op
        );
        sort_expr := format(
            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE "C" %s',
            sort_col, sort_ord, sort_ord
        );
    ELSE
        cursor_expr := format('($5 = '''' OR name COLLATE "C" %s $5)', cursor_op);
        sort_expr := format('name COLLATE "C" %s', sort_ord);
    END IF;

    RETURN QUERY EXECUTE format(
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    NULL::uuid AS id,
                    updated_at,
                    created_at,
                    NULL::timestamptz AS last_accessed_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
            UNION ALL
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    id,
                    updated_at,
                    created_at,
                    last_accessed_at,
                    metadata
                FROM storage.objects
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
        ) obj
        ORDER BY %s
        LIMIT $3
        $sql$,
        cursor_expr,    -- prefixes WHERE
        sort_expr,      -- prefixes ORDER BY
        cursor_expr,    -- objects WHERE
        sort_expr,      -- objects ORDER BY
        sort_expr       -- final ORDER BY
    )
    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: badge; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.badge (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    badge_image text,
    badge_description text
);


ALTER TABLE public.badge OWNER TO postgres;

--
-- Name: badge_tier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.badge_tier (
    badge_id uuid NOT NULL,
    tier_id uuid NOT NULL
);


ALTER TABLE public.badge_tier OWNER TO postgres;

--
-- Name: dream_emotion_context; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dream_emotion_context (
    dream_id uuid NOT NULL,
    emotion_context_id uuid NOT NULL
);


ALTER TABLE public.dream_emotion_context OWNER TO postgres;

--
-- Name: dream_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dream_location (
    dream_id uuid NOT NULL,
    location_id uuid NOT NULL
);


ALTER TABLE public.dream_location OWNER TO postgres;

--
-- Name: dream_node; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dream_node (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    title character varying(200) NOT NULL,
    dream_description text NOT NULL,
    interpretation text,
    creation_date timestamp without time zone,
    privacy_id uuid,
    state_id uuid,
    emotion_id uuid,
    image_url text
);


ALTER TABLE public.dream_node OWNER TO postgres;

--
-- Name: dream_person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dream_person (
    dream_id uuid NOT NULL,
    person_id uuid NOT NULL
);


ALTER TABLE public.dream_person OWNER TO postgres;

--
-- Name: dream_privacy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dream_privacy (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    privacy_description character varying(100) NOT NULL
);


ALTER TABLE public.dream_privacy OWNER TO postgres;

--
-- Name: dream_state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dream_state (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    state_description character varying(100) NOT NULL
);


ALTER TABLE public.dream_state OWNER TO postgres;

--
-- Name: dream_theme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dream_theme (
    dream_id uuid NOT NULL,
    theme_id uuid NOT NULL
);


ALTER TABLE public.dream_theme OWNER TO postgres;

--
-- Name: emotion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emotion (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    emotion character varying(100) NOT NULL,
    color character varying(50) NOT NULL
);


ALTER TABLE public.emotion OWNER TO postgres;

--
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id uuid NOT NULL,
    date_of_birth date,
    coin_amount integer DEFAULT 0
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- Name: profile_emotion_context; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_emotion_context (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid,
    label text NOT NULL,
    last_updated timestamp with time zone DEFAULT now()
);


ALTER TABLE public.profile_emotion_context OWNER TO postgres;

--
-- Name: profile_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_location (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid,
    label text NOT NULL,
    last_updated timestamp with time zone DEFAULT now()
);


ALTER TABLE public.profile_location OWNER TO postgres;

--
-- Name: profile_person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_person (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid,
    label text NOT NULL,
    last_updated timestamp with time zone DEFAULT now()
);


ALTER TABLE public.profile_person OWNER TO postgres;

--
-- Name: profile_theme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_theme (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid,
    label text NOT NULL,
    last_updated timestamp with time zone DEFAULT now()
);


ALTER TABLE public.profile_theme OWNER TO postgres;

--
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_url text NOT NULL
);


ALTER TABLE public.room OWNER TO postgres;

--
-- Name: setting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.setting (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    setting_name character varying(100) NOT NULL
);


ALTER TABLE public.setting OWNER TO postgres;

--
-- Name: skin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skin (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    skin_url text NOT NULL
);


ALTER TABLE public.skin OWNER TO postgres;

--
-- Name: tier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tier (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tier_name character varying(100) NOT NULL,
    coin integer NOT NULL
);


ALTER TABLE public.tier OWNER TO postgres;

--
-- Name: user_badge; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_badge (
    profile_id uuid NOT NULL,
    badge_id uuid NOT NULL
);


ALTER TABLE public.user_badge OWNER TO postgres;

--
-- Name: user_room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_room (
    profile_id uuid NOT NULL,
    room_id uuid NOT NULL
);


ALTER TABLE public.user_room OWNER TO postgres;

--
-- Name: user_skin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_skin (
    profile_id uuid NOT NULL,
    skin_id uuid NOT NULL
);


ALTER TABLE public.user_skin OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: seed_files; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.seed_files (
    path text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE supabase_migrations.seed_files OWNER TO postgres;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	f665e8e6-79b9-4722-8020-6b65a4a49f76	{"action":"user_confirmation_requested","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-09-24 19:12:52.540474+00	
00000000-0000-0000-0000-000000000000	ebcd0865-e2a0-43f8-8b03-bfeb3d9422f2	{"action":"user_signedup","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-09-24 19:13:52.288573+00	
00000000-0000-0000-0000-000000000000	e4195a08-8914-4919-8cc8-074802d92d11	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-09-24 19:13:59.39736+00	
00000000-0000-0000-0000-000000000000	0254764f-271c-4010-820c-81b3e48feda5	{"action":"token_refreshed","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-25 21:01:29.376847+00	
00000000-0000-0000-0000-000000000000	c3401fcf-eccb-40a3-bea4-4969e1a357b7	{"action":"token_revoked","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-25 21:01:29.381011+00	
00000000-0000-0000-0000-000000000000	26b68791-6e4d-41c0-82ba-35f4ccc0f1f3	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-25 21:24:53.193988+00	
00000000-0000-0000-0000-000000000000	7935d4ca-f45a-4356-a1d4-ae1444b22bdb	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-25 21:25:00.676727+00	
00000000-0000-0000-0000-000000000000	b507e97f-db63-4663-bfad-22dcd7307bf0	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-25 21:27:56.315316+00	
00000000-0000-0000-0000-000000000000	07b32055-7169-4e67-9e58-7267361996d6	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-25 21:29:57.271812+00	
00000000-0000-0000-0000-000000000000	bf0db1d7-0018-4c75-9904-9c3693d67913	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-25 21:30:08.474494+00	
00000000-0000-0000-0000-000000000000	303a2769-7e94-494a-9b10-19494d4de1fa	{"action":"token_refreshed","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-25 22:43:25.669022+00	
00000000-0000-0000-0000-000000000000	7a91e644-9007-4edf-95bd-a11000777583	{"action":"token_revoked","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-25 22:43:25.679041+00	
00000000-0000-0000-0000-000000000000	dedae702-c5fa-4ae0-971b-e0cd548d5efe	{"action":"token_refreshed","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-26 00:54:27.577147+00	
00000000-0000-0000-0000-000000000000	38a34741-5fd2-4d52-b4a8-f3c38d99612c	{"action":"token_revoked","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-26 00:54:27.587861+00	
00000000-0000-0000-0000-000000000000	6f9a549a-1c19-459b-9ec4-6abf64223d00	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-26 00:57:03.874739+00	
00000000-0000-0000-0000-000000000000	d09389c9-12e9-40da-9c57-d6074f940190	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-26 00:59:24.587289+00	
00000000-0000-0000-0000-000000000000	87d744ca-d208-4626-8ac1-df46742e77f5	{"action":"user_invited","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"moavalos01@outlook.com.ar","user_id":"0e9ff44b-6965-44da-905d-f0a174c36d74"}}	2025-09-26 19:50:43.356457+00	
00000000-0000-0000-0000-000000000000	c8bf1aba-a37b-406b-9cff-590b75ef6872	{"action":"user_signedup","actor_id":"0e9ff44b-6965-44da-905d-f0a174c36d74","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-09-26 19:51:50.15112+00	
00000000-0000-0000-0000-000000000000	bdc97b8d-56f5-409c-9b22-1499472e5ce3	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"moavalos01@outlook.com.ar","user_id":"0e9ff44b-6965-44da-905d-f0a174c36d74","user_phone":""}}	2025-09-26 19:55:37.755639+00	
00000000-0000-0000-0000-000000000000	c59c7458-a606-4899-a0fc-a2151316ef8b	{"action":"user_invited","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"moavalos01@outlook.com.ar","user_id":"2a33d275-8eeb-45b7-8ee8-1eea6e267b8b"}}	2025-09-26 19:55:45.475121+00	
00000000-0000-0000-0000-000000000000	bfd4b68b-e527-4973-bd5f-2996d9f0184b	{"action":"user_signedup","actor_id":"2a33d275-8eeb-45b7-8ee8-1eea6e267b8b","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-09-26 19:55:57.642204+00	
00000000-0000-0000-0000-000000000000	0020cffc-f97b-4c97-956b-74ae469c820c	{"action":"user_recovery_requested","actor_id":"2a33d275-8eeb-45b7-8ee8-1eea6e267b8b","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"user"}	2025-09-26 19:57:25.693983+00	
00000000-0000-0000-0000-000000000000	b7e73d5f-f81a-4c00-a905-b5f4bb4d9fa7	{"action":"login","actor_id":"2a33d275-8eeb-45b7-8ee8-1eea6e267b8b","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"account"}	2025-09-26 19:57:32.075053+00	
00000000-0000-0000-0000-000000000000	70c6b41c-03cc-4588-93aa-e87816a8dd1c	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"moavalos01@outlook.com.ar","user_id":"2a33d275-8eeb-45b7-8ee8-1eea6e267b8b","user_phone":""}}	2025-09-26 20:05:01.861758+00	
00000000-0000-0000-0000-000000000000	9937c253-ee2d-4521-add0-b3d23c988d91	{"action":"token_refreshed","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-26 22:10:27.832687+00	
00000000-0000-0000-0000-000000000000	8f5ba67c-a762-484f-afd6-2c0c04de84b2	{"action":"token_revoked","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-26 22:10:27.84862+00	
00000000-0000-0000-0000-000000000000	f6262250-b9ec-4721-afba-104928ec7d25	{"action":"login","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-26 22:10:55.15394+00	
00000000-0000-0000-0000-000000000000	6d55a3a7-1265-4616-9093-cdeff065373c	{"action":"token_refreshed","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-27 21:09:10.140528+00	
00000000-0000-0000-0000-000000000000	b005e2e7-739b-4e43-acaf-80a0770db9b8	{"action":"token_revoked","actor_id":"314ea453-cbfb-4180-b88e-aa313085a146","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-27 21:09:10.161636+00	
00000000-0000-0000-0000-000000000000	19517139-713b-4222-9d14-3f18428b9697	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"314ea453-cbfb-4180-b88e-aa313085a146","user_phone":""}}	2025-09-27 21:11:06.809622+00	
00000000-0000-0000-0000-000000000000	f65e04e4-ed5d-4948-a96d-efb4a878a7a1	{"action":"user_confirmation_requested","actor_id":"125527f6-eaab-412d-bc80-f998043ff86f","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-09-27 21:11:20.577811+00	
00000000-0000-0000-0000-000000000000	5a2f13e1-efea-4f95-8528-2384f665aefb	{"action":"user_signedup","actor_id":"125527f6-eaab-412d-bc80-f998043ff86f","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-09-27 21:11:38.810467+00	
00000000-0000-0000-0000-000000000000	e45dd3da-fa52-4a08-a5fa-3eeb89f83ce4	{"action":"login","actor_id":"125527f6-eaab-412d-bc80-f998043ff86f","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-27 21:12:15.378866+00	
00000000-0000-0000-0000-000000000000	c9427873-98e1-43c2-b6f7-2c090245f941	{"action":"login","actor_id":"125527f6-eaab-412d-bc80-f998043ff86f","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-27 21:23:17.671421+00	
00000000-0000-0000-0000-000000000000	4735b6a3-a552-4381-bd1a-e9acb841d9c8	{"action":"login","actor_id":"125527f6-eaab-412d-bc80-f998043ff86f","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-27 21:26:39.980765+00	
00000000-0000-0000-0000-000000000000	a2e4b405-a544-4fae-9d7a-f9f3decc7607	{"action":"user_invited","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"moavalos01@outlook.com.ar","user_id":"c798fd85-d384-4162-9919-f57b21c40ea1"}}	2025-09-27 23:20:45.166859+00	
00000000-0000-0000-0000-000000000000	36fad503-c46d-451c-85e7-dde43019bbad	{"action":"user_signedup","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-09-27 23:20:53.037231+00	
00000000-0000-0000-0000-000000000000	b02f9b59-d333-4b2d-8271-3d972f884adf	{"action":"user_recovery_requested","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"user"}	2025-09-27 23:22:08.729803+00	
00000000-0000-0000-0000-000000000000	d7cf4a2a-e1b3-4d00-b7ba-663984b60f20	{"action":"login","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"account"}	2025-09-27 23:22:14.836211+00	
00000000-0000-0000-0000-000000000000	770896a5-861d-44f2-8522-121c39380091	{"action":"user_recovery_requested","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"user"}	2025-09-27 23:24:07.147464+00	
00000000-0000-0000-0000-000000000000	bd3f04fd-0d13-4f29-9122-e2985d24aca4	{"action":"login","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"account"}	2025-09-27 23:24:18.928431+00	
00000000-0000-0000-0000-000000000000	a92656d6-3840-49fc-91b8-193bb8a5ec8f	{"action":"user_recovery_requested","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"user"}	2025-09-27 23:25:58.338298+00	
00000000-0000-0000-0000-000000000000	243620b3-b5f0-4c18-b1b1-3b8240a00c4a	{"action":"login","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"account"}	2025-09-27 23:26:07.025887+00	
00000000-0000-0000-0000-000000000000	a636b265-d98a-4136-848a-92c3b1c8d280	{"action":"user_recovery_requested","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"user"}	2025-09-28 15:12:34.732279+00	
00000000-0000-0000-0000-000000000000	0d8d62fc-b970-488a-94b7-ba0fbdce66ae	{"action":"login","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"account"}	2025-09-28 15:12:48.089663+00	
00000000-0000-0000-0000-000000000000	d861c0d2-1d5c-4f63-acf6-53732148d6be	{"action":"token_refreshed","actor_id":"125527f6-eaab-412d-bc80-f998043ff86f","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-29 18:44:50.826315+00	
00000000-0000-0000-0000-000000000000	e2cb5535-a58a-40ae-b049-c1a63856f41e	{"action":"token_revoked","actor_id":"125527f6-eaab-412d-bc80-f998043ff86f","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-29 18:44:50.839652+00	
00000000-0000-0000-0000-000000000000	ceb0aa4e-ab2f-44b7-890d-9b047e6f5729	{"action":"token_refreshed","actor_id":"125527f6-eaab-412d-bc80-f998043ff86f","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-09-29 18:44:51.413253+00	
00000000-0000-0000-0000-000000000000	e0a06838-1bba-44d9-96ce-4d68dbfdc6c7	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"125527f6-eaab-412d-bc80-f998043ff86f","user_phone":""}}	2025-09-29 18:45:58.969147+00	
00000000-0000-0000-0000-000000000000	81159662-a74c-491d-91ef-98893d606c37	{"action":"user_confirmation_requested","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-09-30 14:17:02.232807+00	
00000000-0000-0000-0000-000000000000	416a1aaa-169b-4256-b159-4311e2ef195e	{"action":"user_signedup","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-09-30 14:17:59.33305+00	
00000000-0000-0000-0000-000000000000	93350983-2050-45a0-bfba-d70acec949c4	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-09-30 14:27:49.889792+00	
00000000-0000-0000-0000-000000000000	27364c8a-5ee1-4f71-9432-74652a32dbae	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-30 14:27:59.299163+00	
00000000-0000-0000-0000-000000000000	65092563-7915-4f93-b74e-bba4db3fc8e9	{"action":"logout","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-09-30 14:34:24.584793+00	
00000000-0000-0000-0000-000000000000	d27b84e4-6009-4695-9a54-ca675e16f699	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-09-30 14:34:32.321019+00	
00000000-0000-0000-0000-000000000000	f4ceb19c-a858-4699-87c1-b22dddbaf42d	{"action":"logout","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-09-30 14:34:40.454999+00	
00000000-0000-0000-0000-000000000000	7371bf14-8e7f-48e7-ad62-fcc884337916	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-30 14:34:46.357804+00	
00000000-0000-0000-0000-000000000000	bbb9b6b2-7fd3-4bc1-966b-2e2e3fcf1dd8	{"action":"logout","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-09-30 14:35:47.571162+00	
00000000-0000-0000-0000-000000000000	3b99aa6f-4c09-4ded-8112-2c34c61d0e69	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-30 14:41:09.27936+00	
00000000-0000-0000-0000-000000000000	432c67aa-4133-4690-8450-5b14cb900237	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-09-30 14:41:26.567614+00	
00000000-0000-0000-0000-000000000000	5d1438fb-33ef-4728-8b5e-9439f3607080	{"action":"token_refreshed","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-03 20:56:47.898336+00	
00000000-0000-0000-0000-000000000000	51411995-590d-45aa-b086-4523a43aeac5	{"action":"token_revoked","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-03 20:56:47.922664+00	
00000000-0000-0000-0000-000000000000	d86b2eb8-cb7d-4aec-8427-3ff4ed438100	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-03 20:56:58.402293+00	
00000000-0000-0000-0000-000000000000	8c8c79ee-3caf-4e19-b9c6-71ba698e4fa7	{"action":"logout","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-03 21:09:12.872956+00	
00000000-0000-0000-0000-000000000000	892ba524-e3f4-40ff-aa36-72856579dd42	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-03 21:09:20.580943+00	
00000000-0000-0000-0000-000000000000	54fdae42-0e80-4d07-a0f9-208ad0315de9	{"action":"logout","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-03 21:11:56.496587+00	
00000000-0000-0000-0000-000000000000	eb078e43-ef75-42bd-9ebe-090e3b2861b1	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-03 21:12:04.823657+00	
00000000-0000-0000-0000-000000000000	add2f041-3189-4a87-b10d-7ae3c40cc0ce	{"action":"logout","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-03 21:13:33.741243+00	
00000000-0000-0000-0000-000000000000	2d6ee0a2-2e65-4f69-af9f-dc5cf4541fe1	{"action":"login","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-03 21:13:59.159571+00	
00000000-0000-0000-0000-000000000000	dd272c33-8ee7-4d2c-a214-e5a05392c306	{"action":"logout","actor_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-03 21:21:14.305117+00	
00000000-0000-0000-0000-000000000000	d8db66c2-6614-4ec9-ba58-b84cd12c1062	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"e5951981-6a02-4fe1-930d-1ab33005f25e","user_phone":""}}	2025-10-03 21:21:29.873352+00	
00000000-0000-0000-0000-000000000000	71e644d6-2459-47ae-9fa3-2784c48092fd	{"action":"user_confirmation_requested","actor_id":"0749f761-4e66-4660-873d-7da26993fd79","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-03 21:22:04.37231+00	
00000000-0000-0000-0000-000000000000	d9d69d29-7ce9-4192-bebb-a0c15368cce3	{"action":"user_signedup","actor_id":"0749f761-4e66-4660-873d-7da26993fd79","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-03 21:22:25.007985+00	
00000000-0000-0000-0000-000000000000	f61abc1a-f1cc-4a9b-b024-a6f17de9813f	{"action":"login","actor_id":"0749f761-4e66-4660-873d-7da26993fd79","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-03 21:22:36.304195+00	
00000000-0000-0000-0000-000000000000	96061534-e0bc-4f1a-a84b-f08c70028d11	{"action":"token_refreshed","actor_id":"0749f761-4e66-4660-873d-7da26993fd79","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-10 14:21:23.078429+00	
00000000-0000-0000-0000-000000000000	91ee4e4d-d955-4642-b08c-a897a8ce51a7	{"action":"token_revoked","actor_id":"0749f761-4e66-4660-873d-7da26993fd79","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-10 14:21:23.093995+00	
00000000-0000-0000-0000-000000000000	40899e45-90f5-4f9b-8b31-129b03d2aeed	{"action":"user_repeated_signup","actor_id":"0749f761-4e66-4660-873d-7da26993fd79","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-10 14:46:53.684816+00	
00000000-0000-0000-0000-000000000000	e04fb9e2-6a75-47e2-92be-27e19e2a0d9b	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"0749f761-4e66-4660-873d-7da26993fd79","user_phone":""}}	2025-10-10 14:48:58.716749+00	
00000000-0000-0000-0000-000000000000	87cc6cbe-736f-4cb7-8e00-0a0812a19954	{"action":"user_confirmation_requested","actor_id":"250c6e03-2fe5-479f-973e-e5534bfcc48b","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-10 15:03:48.373119+00	
00000000-0000-0000-0000-000000000000	1315ab6f-13ee-4113-9bc2-f558ac2f0565	{"action":"user_signedup","actor_id":"250c6e03-2fe5-479f-973e-e5534bfcc48b","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-10 15:04:09.795544+00	
00000000-0000-0000-0000-000000000000	2cc1921d-7e94-499b-a171-de053c4f5e39	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"250c6e03-2fe5-479f-973e-e5534bfcc48b","user_phone":""}}	2025-10-10 15:06:59.716755+00	
00000000-0000-0000-0000-000000000000	bb9dcf0a-18b1-4cbc-9946-6ca4a00211e5	{"action":"user_confirmation_requested","actor_id":"e0f29dc1-4066-4be4-9a22-adebd4ad4f5b","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-10 15:07:04.419278+00	
00000000-0000-0000-0000-000000000000	a8326691-41aa-4dee-b914-6c69d50aab95	{"action":"user_signedup","actor_id":"e0f29dc1-4066-4be4-9a22-adebd4ad4f5b","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-10 15:07:29.111027+00	
00000000-0000-0000-0000-000000000000	b8b792ac-b4f0-4fb5-b3f3-41e00eb021e4	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"e0f29dc1-4066-4be4-9a22-adebd4ad4f5b","user_phone":""}}	2025-10-10 15:10:12.076579+00	
00000000-0000-0000-0000-000000000000	e02c0639-79dc-4b17-87a3-ff3f75a8cb76	{"action":"user_confirmation_requested","actor_id":"14111349-2ded-4563-ab57-42f10fdac251","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-10 15:10:37.424126+00	
00000000-0000-0000-0000-000000000000	07c6f224-0988-458c-be50-75c793bb7bb5	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"14111349-2ded-4563-ab57-42f10fdac251","user_phone":""}}	2025-10-10 15:12:12.708558+00	
00000000-0000-0000-0000-000000000000	64c3d664-a6e4-417d-8884-ea7c9b8b788c	{"action":"user_confirmation_requested","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-10 15:12:15.448751+00	
00000000-0000-0000-0000-000000000000	102b7a01-449c-4f6d-9399-f14361011e9f	{"action":"user_signedup","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-10 15:12:24.49795+00	
00000000-0000-0000-0000-000000000000	5021c690-548d-447f-b808-e3d6c1981c82	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-10 15:34:53.341078+00	
00000000-0000-0000-0000-000000000000	e0ffbf79-11d5-4bf9-ad63-05873ec89b0e	{"action":"logout","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-10 15:35:55.078065+00	
00000000-0000-0000-0000-000000000000	9b334210-c368-4663-9a05-2b2073a0ad2c	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-10 15:36:02.000783+00	
00000000-0000-0000-0000-000000000000	2fa23537-8f5c-468d-802c-de248b5b2c0f	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-10 15:46:04.576793+00	
00000000-0000-0000-0000-000000000000	0d88c7f2-0e10-408b-a102-689c1563487d	{"action":"token_refreshed","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-10 17:37:56.759683+00	
00000000-0000-0000-0000-000000000000	c79f0679-ce4b-463e-8523-aa670c164798	{"action":"token_revoked","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-10 17:37:56.792159+00	
00000000-0000-0000-0000-000000000000	745280d6-60f6-4778-8cb5-daf34b365f98	{"action":"user_signedup","actor_id":"2d57c1c8-b94d-4df9-a3c4-0d6cbdcc0965","actor_name":"ricartes123","actor_username":"pedro.ricartes123@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-10-11 06:17:57.262206+00	
00000000-0000-0000-0000-000000000000	2e0a5c5f-02de-4bdc-b1c8-af7265a92ae5	{"action":"user_confirmation_requested","actor_id":"9703ff1a-b3f6-429d-9ec4-c93e4e2f791c","actor_name":"pedro123","actor_username":"pedro-le2003@hotmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-11 06:18:45.925795+00	
00000000-0000-0000-0000-000000000000	709e4f80-1705-4c59-a714-9460cbb6e65b	{"action":"user_signedup","actor_id":"9703ff1a-b3f6-429d-9ec4-c93e4e2f791c","actor_name":"pedro123","actor_username":"pedro-le2003@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-11 06:19:09.39865+00	
00000000-0000-0000-0000-000000000000	45af4780-0af2-4739-9083-e75d64f326bd	{"action":"login","actor_id":"9703ff1a-b3f6-429d-9ec4-c93e4e2f791c","actor_name":"pedro123","actor_username":"pedro-le2003@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-11 06:19:15.295636+00	
00000000-0000-0000-0000-000000000000	bc373b2f-eb0f-475e-bcc4-f4abfc27794b	{"action":"token_refreshed","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-11 16:40:12.447204+00	
00000000-0000-0000-0000-000000000000	76f35273-009c-414a-9c41-7001ad9a0805	{"action":"token_revoked","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-11 16:40:12.471201+00	
00000000-0000-0000-0000-000000000000	979685dd-ffd2-4301-aaaa-16d86129d258	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-11 16:40:32.035906+00	
00000000-0000-0000-0000-000000000000	5ce4474f-e2df-457c-a357-162eb6376abd	{"action":"logout","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-11 16:46:58.239617+00	
00000000-0000-0000-0000-000000000000	2fdbd860-b659-4128-b54d-24bac80f372b	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-11 16:47:14.123307+00	
00000000-0000-0000-0000-000000000000	85f1524d-27a3-401a-a0da-04f01f1231bc	{"action":"logout","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-11 16:51:49.468272+00	
00000000-0000-0000-0000-000000000000	31495056-1b47-4251-bd5d-5492eda0f214	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-11 16:54:16.07331+00	
00000000-0000-0000-0000-000000000000	a082fbb9-168d-454c-9995-7690f460e274	{"action":"logout","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-11 16:54:28.521192+00	
00000000-0000-0000-0000-000000000000	155913d7-03e9-45ae-99b5-1eef1d9a545c	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-11 17:04:26.428519+00	
00000000-0000-0000-0000-000000000000	c35475d6-32ba-447f-91f1-29f6a3e32f85	{"action":"token_refreshed","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-11 23:49:19.943769+00	
00000000-0000-0000-0000-000000000000	2f4780f4-04d8-4c90-8267-952478b927fd	{"action":"token_revoked","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-11 23:49:19.96974+00	
00000000-0000-0000-0000-000000000000	ff788927-4d8d-4af6-8023-454e9472b4aa	{"action":"logout","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-11 23:49:23.377263+00	
00000000-0000-0000-0000-000000000000	107e8a30-c420-4de3-b4c9-3b8c70b2812d	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-11 23:49:29.367725+00	
00000000-0000-0000-0000-000000000000	a50d7ae8-e31c-48d0-8cd6-03c506bc7a6d	{"action":"logout","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-11 23:49:34.006085+00	
00000000-0000-0000-0000-000000000000	1d4be0d5-e2ad-4f95-934c-a8985cbe9c6a	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-11 23:49:43.263126+00	
00000000-0000-0000-0000-000000000000	d17636a3-0e91-4d24-8761-3ddf7d98e719	{"action":"logout","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-11 23:50:53.221677+00	
00000000-0000-0000-0000-000000000000	34ec4826-9063-4fc0-9d8c-b8cd79237828	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 00:19:58.233497+00	
00000000-0000-0000-0000-000000000000	577822ad-aea3-45a0-a205-fe353402a6e4	{"action":"token_refreshed","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 03:00:28.077898+00	
00000000-0000-0000-0000-000000000000	44ad3e05-a422-462d-923f-eb7ac33ce8f5	{"action":"token_revoked","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 03:00:28.089075+00	
00000000-0000-0000-0000-000000000000	e4c88b9a-f194-4db0-b9d9-f1f7118df515	{"action":"token_refreshed","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 14:52:38.396766+00	
00000000-0000-0000-0000-000000000000	5b508980-3eac-488a-8192-e0c90d0eb8ce	{"action":"token_revoked","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 14:52:38.418052+00	
00000000-0000-0000-0000-000000000000	c7cfba88-2296-496b-a9f6-54e72011576a	{"action":"logout","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 14:53:38.982857+00	
00000000-0000-0000-0000-000000000000	2eeb960e-7955-4adb-8c62-790dc2034d69	{"action":"login","actor_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 14:54:57.243156+00	
00000000-0000-0000-0000-000000000000	93045d30-99c1-4bb0-aa3a-df645fb800da	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"22594c0f-fbb3-4e72-aa8a-fc46434a45e0","user_phone":""}}	2025-10-12 14:55:24.071151+00	
00000000-0000-0000-0000-000000000000	c4046bac-253d-40e5-a56d-bc0630c3291c	{"action":"user_confirmation_requested","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-12 14:55:49.833262+00	
00000000-0000-0000-0000-000000000000	7015eb38-7b3a-4570-a797-f5dd35ffdf5a	{"action":"user_signedup","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-12 14:56:10.010684+00	
00000000-0000-0000-0000-000000000000	65c29c53-0efd-4c3c-accf-8d10cbcfd99c	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 14:56:19.54147+00	
00000000-0000-0000-0000-000000000000	4e27a7d9-dd63-401f-82a4-b85636706f35	{"action":"logout","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 14:56:25.832426+00	
00000000-0000-0000-0000-000000000000	a2537471-afaa-4cf5-9da9-23e861815bf3	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-12 14:56:43.496246+00	
00000000-0000-0000-0000-000000000000	062dec33-bae7-44a2-99e6-98b8524cdd4d	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 15:05:37.707925+00	
00000000-0000-0000-0000-000000000000	8f9c53ab-2d2c-47b5-8293-4d69a628bcac	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 15:05:41.413384+00	
00000000-0000-0000-0000-000000000000	051ce4ca-7c8d-46fe-ac95-7e939af99a99	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 15:05:51.851939+00	
00000000-0000-0000-0000-000000000000	1e7616e2-66ea-4bb9-b324-329d8852c1c5	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-12 15:05:58.443139+00	
00000000-0000-0000-0000-000000000000	74c449e0-5eb2-4636-8ea1-69b01790dc0c	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 15:07:03.117452+00	
00000000-0000-0000-0000-000000000000	a47210e9-d2cc-41e9-8eb5-9a80caff7fe8	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 15:08:08.098216+00	
00000000-0000-0000-0000-000000000000	0124da15-4bc6-4fd5-a8b7-7c04d034909b	{"action":"logout","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 15:08:11.706883+00	
00000000-0000-0000-0000-000000000000	22361f1e-732c-42b0-8175-fb229b070805	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-12 15:08:26.524893+00	
00000000-0000-0000-0000-000000000000	1362d3ec-468a-4baf-86b2-08fc47ebf78e	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-12 15:09:16.313688+00	
00000000-0000-0000-0000-000000000000	f46c62b4-40e7-47a4-84c9-e2e811810e97	{"action":"logout","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 15:09:22.211385+00	
00000000-0000-0000-0000-000000000000	e1f54c40-e0d8-4893-a907-d6619377427e	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 15:12:04.883693+00	
00000000-0000-0000-0000-000000000000	e6896b0c-2cd4-42ed-b7e0-ed38859d04e0	{"action":"logout","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 15:13:41.116244+00	
00000000-0000-0000-0000-000000000000	704d9f26-d6eb-49b5-b7cc-1bc14228b014	{"action":"token_refreshed","actor_id":"9703ff1a-b3f6-429d-9ec4-c93e4e2f791c","actor_name":"pedro123","actor_username":"pedro-le2003@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 15:23:08.440844+00	
00000000-0000-0000-0000-000000000000	aaf7c18a-5074-4800-bc84-bcbc80591369	{"action":"token_revoked","actor_id":"9703ff1a-b3f6-429d-9ec4-c93e4e2f791c","actor_name":"pedro123","actor_username":"pedro-le2003@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 15:23:08.443406+00	
00000000-0000-0000-0000-000000000000	cf64b0a3-fde3-4005-91bb-4df35a416124	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 16:23:59.684195+00	
00000000-0000-0000-0000-000000000000	b1d7adf5-4a0f-4029-a082-da43f5b8336b	{"action":"logout","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 16:24:04.864069+00	
00000000-0000-0000-0000-000000000000	e8f9b139-95aa-452d-86a2-119da883bdd7	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 16:35:21.474516+00	
00000000-0000-0000-0000-000000000000	3f38ae68-2f6a-4a2a-95da-bffc7a628226	{"action":"logout","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 16:36:39.87747+00	
00000000-0000-0000-0000-000000000000	956e5417-148d-4d79-840f-678fa6b0bfcc	{"action":"user_signedup","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-10-12 17:42:15.277508+00	
00000000-0000-0000-0000-000000000000	bd7d4eaa-59ac-4d24-96ff-7d91e28caf61	{"action":"login","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 18:23:01.936264+00	
00000000-0000-0000-0000-000000000000	01c3075e-5ed1-426f-8c60-9fe026d3862a	{"action":"logout","actor_id":"54116b26-4a1e-4273-93af-eef15e646991","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 18:23:07.623826+00	
00000000-0000-0000-0000-000000000000	ffc2c74a-e587-4e99-ae4e-4e991c91291f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mutuverria00@gmail.com","user_id":"54116b26-4a1e-4273-93af-eef15e646991","user_phone":""}}	2025-10-12 18:23:24.92278+00	
00000000-0000-0000-0000-000000000000	828e8d0b-5dcd-45f8-be7f-fa88f0ee80e9	{"action":"user_confirmation_requested","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-12 18:24:33.626815+00	
00000000-0000-0000-0000-000000000000	3bdfc7f1-ac02-4eb6-ac6f-bd1f0bb7f06f	{"action":"user_signedup","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-12 18:24:43.647589+00	
00000000-0000-0000-0000-000000000000	3dce890a-bf2a-4857-a43d-2bb29c4c9a58	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 18:25:23.279322+00	
00000000-0000-0000-0000-000000000000	b086b2de-e72a-41d6-b879-b99c728e4235	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 18:25:46.186336+00	
00000000-0000-0000-0000-000000000000	d922197c-8161-4618-91d6-bad1c6931511	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 18:40:37.616428+00	
00000000-0000-0000-0000-000000000000	822a507d-a7ef-44b4-bdb9-0e7c2f36c2b1	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 18:40:37.640412+00	
00000000-0000-0000-0000-000000000000	0a3df254-d973-4dce-83f4-d89bd412e3d8	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 19:20:03.14301+00	
00000000-0000-0000-0000-000000000000	88b836cf-4ff2-4f89-8b21-43546478bf9d	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 19:32:00.594168+00	
00000000-0000-0000-0000-000000000000	1aa86be0-663f-4a6e-8ba4-e238f8fdce97	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 19:38:54.929572+00	
00000000-0000-0000-0000-000000000000	d162c19c-291e-4375-b01a-96fb1de49907	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 19:38:54.933758+00	
00000000-0000-0000-0000-000000000000	7598e088-8f02-4253-857f-e2a2c83fac3e	{"action":"login","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-12 19:58:36.882283+00	
00000000-0000-0000-0000-000000000000	3fe8f97b-94dc-4f07-af64-451c94c7fb10	{"action":"user_repeated_signup","actor_id":"c798fd85-d384-4162-9919-f57b21c40ea1","actor_username":"moavalos01@outlook.com.ar","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-12 20:21:09.79188+00	
00000000-0000-0000-0000-000000000000	d08ac0a4-0da2-4a69-b49c-699ea91914e9	{"action":"user_signedup","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-10-12 20:22:11.671294+00	
00000000-0000-0000-0000-000000000000	1f502bff-9486-46f0-8f27-c97dfbaebbfc	{"action":"logout","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 20:23:04.316681+00	
00000000-0000-0000-0000-000000000000	d7205b42-c876-4a46-a0aa-bb703cce7fde	{"action":"login","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-12 20:24:42.28266+00	
00000000-0000-0000-0000-000000000000	fddd3cd7-49fb-4c2a-842f-de136c7aa659	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 20:30:33.225715+00	
00000000-0000-0000-0000-000000000000	0021c56c-a03d-4b95-80f2-b001779df83c	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 20:30:43.685278+00	
00000000-0000-0000-0000-000000000000	0bc9c40c-3f80-42e2-9fb3-4fcf365dc016	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 20:32:21.372548+00	
00000000-0000-0000-0000-000000000000	80d50c74-19d9-4fec-9f77-cd4b582ae10f	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-12 21:15:20.260609+00	
00000000-0000-0000-0000-000000000000	82695cc3-6bea-4d3b-97ff-bdebb503718f	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-12 21:18:25.742812+00	
00000000-0000-0000-0000-000000000000	9a5a4de1-54f2-4a99-bebf-e1cc32eed41a	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 21:18:31.744757+00	
00000000-0000-0000-0000-000000000000	708fb34c-978a-4994-a96e-2b96a8a34ab4	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 21:24:18.058766+00	
00000000-0000-0000-0000-000000000000	b5ce85f7-e1c4-4b0a-8a1e-040010b019a9	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 21:24:18.07016+00	
00000000-0000-0000-0000-000000000000	bedcfc69-af90-404b-9522-b399507ff20e	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 22:22:32.217457+00	
00000000-0000-0000-0000-000000000000	bad80f12-48a2-416f-b132-2423bf854f1d	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 22:22:32.235132+00	
00000000-0000-0000-0000-000000000000	e51bdfb2-f80e-4ec2-86a9-c068e3274295	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 22:43:54.32964+00	
00000000-0000-0000-0000-000000000000	8d6d2eb1-c45b-4b9a-8e50-c84413f1e57f	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 22:43:54.340294+00	
00000000-0000-0000-0000-000000000000	ca4e44e5-afc4-4c31-96c7-cec8e677f9b6	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 23:23:40.873865+00	
00000000-0000-0000-0000-000000000000	4ab18898-9ff2-4514-bc71-3c48d4968f96	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-12 23:23:40.882779+00	
00000000-0000-0000-0000-000000000000	f6ef0e52-b657-434b-9bdf-cfb9f07e177b	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-12 23:36:27.252316+00	
00000000-0000-0000-0000-000000000000	002ed48b-61e3-4746-9fe1-284576de4c0c	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 00:42:46.705202+00	
00000000-0000-0000-0000-000000000000	d42655f7-e272-4431-aacc-1b92c93b3b4f	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 00:42:46.719914+00	
00000000-0000-0000-0000-000000000000	fe322aa6-d734-4a88-b266-373d64cfd194	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 00:43:21.019096+00	
00000000-0000-0000-0000-000000000000	3afb4d54-9af8-45c7-bd33-18becde15272	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 01:30:23.545787+00	
00000000-0000-0000-0000-000000000000	341b941f-e35e-456a-8a29-45f81b371a96	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 01:33:01.04881+00	
00000000-0000-0000-0000-000000000000	48e877ed-237b-4967-bde1-d1190a6e8989	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-13 02:01:47.555243+00	
00000000-0000-0000-0000-000000000000	77ae3049-87d4-4ad9-9417-d1ac7cb6267f	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-13 02:44:36.578112+00	
00000000-0000-0000-0000-000000000000	9d94af6d-36c2-421c-ab02-33128b93ffae	{"action":"logout","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 02:46:05.302529+00	
00000000-0000-0000-0000-000000000000	5a0178fc-5f0a-4f86-975c-88c9f4dbbd30	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 02:46:17.771956+00	
00000000-0000-0000-0000-000000000000	12370a1b-0ca6-4849-90b2-08560a2ffa12	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 11:36:06.893396+00	
00000000-0000-0000-0000-000000000000	8db4f32d-0674-4d60-9f09-e74125756f5d	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 11:36:06.923826+00	
00000000-0000-0000-0000-000000000000	5afacc45-2347-4953-8070-a77d17fff4b1	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 12:34:17.937924+00	
00000000-0000-0000-0000-000000000000	67f156ad-0023-4f54-90bf-7127603aa0d0	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 12:34:17.953057+00	
00000000-0000-0000-0000-000000000000	74c3ad31-604f-4471-946c-485f82d2d6e8	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 13:32:27.58194+00	
00000000-0000-0000-0000-000000000000	3f89e0c4-aaf9-44a0-9b04-5cf40007deaa	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 13:32:27.598365+00	
00000000-0000-0000-0000-000000000000	c52de0ae-84c8-4310-983c-018ec1b0b5f8	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 14:30:49.95928+00	
00000000-0000-0000-0000-000000000000	194207a6-ccd5-4c51-8231-90bb98e5bc2d	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 14:30:49.97227+00	
00000000-0000-0000-0000-000000000000	42841289-0522-4a76-b520-0a79800354c7	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 15:28:54.016831+00	
00000000-0000-0000-0000-000000000000	4d6c1ae4-7dca-4f0f-834f-af5f841ce33d	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 15:28:54.035313+00	
00000000-0000-0000-0000-000000000000	e72d7fda-93dd-4513-bc1a-6d560e08db7d	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 16:02:41.551862+00	
00000000-0000-0000-0000-000000000000	a5063418-ff97-4589-b45c-4efbefc11355	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 16:03:20.70584+00	
00000000-0000-0000-0000-000000000000	910d0ff9-de72-4bc4-aec0-2e8bfc7f4072	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 16:04:57.657459+00	
00000000-0000-0000-0000-000000000000	446a4eb9-c15e-49c8-af3c-38d5ebc31abf	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 16:05:34.597703+00	
00000000-0000-0000-0000-000000000000	9b0194a7-acca-4e34-867f-be37a989a195	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 16:27:11.203402+00	
00000000-0000-0000-0000-000000000000	26d6445c-a2b9-4cba-aa16-47021396166e	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 16:27:11.212855+00	
00000000-0000-0000-0000-000000000000	273e2f69-7860-4021-a964-13f2df8f0bfb	{"action":"logout","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 16:47:57.006676+00	
00000000-0000-0000-0000-000000000000	cf37f142-18e8-4839-b283-b6f8a82c43db	{"action":"login","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-13 16:48:47.703056+00	
00000000-0000-0000-0000-000000000000	444cec03-3b9e-47be-965a-d4590ff78b4b	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 17:47:17.998554+00	
00000000-0000-0000-0000-000000000000	6e51043d-756d-4f9e-bfe1-4f9e26239164	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 17:47:18.011946+00	
00000000-0000-0000-0000-000000000000	b1bd1e27-054d-40df-8bef-fd3d3a73761d	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 18:48:56.741258+00	
00000000-0000-0000-0000-000000000000	c47589d9-a8b3-4269-a892-fade13db8ffc	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 18:48:56.768633+00	
00000000-0000-0000-0000-000000000000	85386fd4-f688-4e51-b357-7781b92df6d9	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 19:47:21.866363+00	
00000000-0000-0000-0000-000000000000	7ffdbc9a-a11f-455e-b3e9-60cc36f79312	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 19:47:21.889329+00	
00000000-0000-0000-0000-000000000000	eaf1e81c-105c-4afc-b2de-6ca62580c1c3	{"action":"token_refreshed","actor_id":"9703ff1a-b3f6-429d-9ec4-c93e4e2f791c","actor_name":"pedro123","actor_username":"pedro-le2003@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 19:59:48.522552+00	
00000000-0000-0000-0000-000000000000	fccb8bf4-2eff-449d-b45c-120634b29176	{"action":"token_revoked","actor_id":"9703ff1a-b3f6-429d-9ec4-c93e4e2f791c","actor_name":"pedro123","actor_username":"pedro-le2003@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 19:59:48.527743+00	
00000000-0000-0000-0000-000000000000	3ea032c9-e45a-405b-a827-a4feff64943b	{"action":"user_signedup","actor_id":"798a0644-deb5-4abd-8593-3829b4a9a8df","actor_name":"Pedro Ricartes","actor_username":"su.campos.211@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-10-13 20:10:36.446404+00	
00000000-0000-0000-0000-000000000000	7ff10cd4-ca7c-4ace-b4b6-e3759a440232	{"action":"logout","actor_id":"798a0644-deb5-4abd-8593-3829b4a9a8df","actor_name":"Pedro Ricartes","actor_username":"su.campos.211@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 20:19:11.3322+00	
00000000-0000-0000-0000-000000000000	7cb41ac3-4ec3-4c79-b1a0-06e435164e62	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 20:19:18.495441+00	
00000000-0000-0000-0000-000000000000	3446fd62-3d46-47c9-9966-8afa1e86fb29	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 20:42:17.188501+00	
00000000-0000-0000-0000-000000000000	823b851a-ce38-4041-b369-9f0468297cb1	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 20:42:24.546158+00	
00000000-0000-0000-0000-000000000000	9cff4a92-66d8-44bd-9c76-abd0f9d66966	{"action":"logout","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 20:43:50.469875+00	
00000000-0000-0000-0000-000000000000	4ed4a9a1-c198-44b1-be54-0c9b5bee1c9d	{"action":"login","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-13 20:44:01.417452+00	
00000000-0000-0000-0000-000000000000	758d802e-ff2c-45f3-9a7b-257187260d6e	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 21:42:17.510213+00	
00000000-0000-0000-0000-000000000000	bd4b1c1c-459f-4654-b163-8d756b565125	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 21:42:17.536813+00	
00000000-0000-0000-0000-000000000000	374a5dfd-c699-4824-a724-c818114cbfb5	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 22:07:16.986236+00	
00000000-0000-0000-0000-000000000000	3da776e1-6490-47df-868b-e927095d3895	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 22:40:30.645271+00	
00000000-0000-0000-0000-000000000000	3cb28132-f125-4b10-ad28-44894b5ea161	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 22:40:30.66396+00	
00000000-0000-0000-0000-000000000000	9d6c3c40-322e-4cf2-bf21-3a048a6646c4	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 23:14:24.718442+00	
00000000-0000-0000-0000-000000000000	f78db8ce-067c-4b64-8f85-c399420c92ed	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 23:14:24.729496+00	
00000000-0000-0000-0000-000000000000	4351c5c3-aad7-4f64-94fb-13116400ffb8	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-13 23:14:35.247966+00	
00000000-0000-0000-0000-000000000000	479fbfd3-cb20-4294-ba45-8577f28d95bd	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-13 23:15:05.139524+00	
00000000-0000-0000-0000-000000000000	0a3a318d-6e9e-4311-8a5f-6386eb4dbd41	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 23:38:59.19811+00	
00000000-0000-0000-0000-000000000000	34b9cba7-1443-42af-b0e8-df671b6320ef	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-13 23:38:59.205186+00	
00000000-0000-0000-0000-000000000000	6624ef21-adaa-4fd0-afba-abdb73b07c02	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 01:01:15.191676+00	
00000000-0000-0000-0000-000000000000	c2aa1ff7-7179-4fa9-b22c-a0e89b14ff14	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 01:01:15.217723+00	
00000000-0000-0000-0000-000000000000	b2beac2f-17fc-4bf5-997f-9a7d19f3b95c	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 01:30:45.99529+00	
00000000-0000-0000-0000-000000000000	aa40b23a-a1e7-450c-b5e5-a3a4b580fccd	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 01:45:49.876996+00	
00000000-0000-0000-0000-000000000000	16fe85b8-c38e-4a15-9ee4-b29a66ab7d30	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 02:44:28.949441+00	
00000000-0000-0000-0000-000000000000	86adfd75-77d4-4b2a-9a90-1a7dfbc5fae0	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 02:44:28.963778+00	
00000000-0000-0000-0000-000000000000	868ed4d9-11fc-4c39-8514-374df7d50eae	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-14 02:44:31.013336+00	
00000000-0000-0000-0000-000000000000	4206e51d-7903-4500-85b6-43b4dc63bc4e	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 10:44:07.895394+00	
00000000-0000-0000-0000-000000000000	8ca400e0-957f-4e4a-b35c-a8ba3813e1a2	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 10:44:07.918119+00	
00000000-0000-0000-0000-000000000000	cd542af4-9d65-448d-bce6-f98c87e8ec9e	{"action":"login","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-14 10:44:12.644715+00	
00000000-0000-0000-0000-000000000000	b0874691-2ca0-4bcc-b734-02190ab7d791	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 12:00:53.41795+00	
00000000-0000-0000-0000-000000000000	04024741-d68e-4076-ae7a-547c61a9f661	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 12:00:53.434489+00	
00000000-0000-0000-0000-000000000000	4d07be28-96e3-4040-9839-438c8fcafbd6	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 12:02:05.308032+00	
00000000-0000-0000-0000-000000000000	52ec0c06-cee0-4b9d-9a32-d78c659edf67	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 12:02:05.316795+00	
00000000-0000-0000-0000-000000000000	6029ccc1-049a-4232-b46f-37d1ce11fe7b	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 12:59:35.965291+00	
00000000-0000-0000-0000-000000000000	e9b088e0-f4ec-496e-b252-e6691f69aab1	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 12:59:35.978219+00	
00000000-0000-0000-0000-000000000000	3a5b6197-43bc-4f80-9daa-3d09d21edcfc	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 14:23:26.611076+00	
00000000-0000-0000-0000-000000000000	46c45a7b-cfb1-4961-839e-b440983ae29b	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 14:23:26.627083+00	
00000000-0000-0000-0000-000000000000	99ed391b-7b3b-4872-b232-8c7ddf482e26	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 18:42:11.834507+00	
00000000-0000-0000-0000-000000000000	f1a3ae53-7817-4cc8-84cd-9ca1f0e5cdbb	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 20:07:22.920229+00	
00000000-0000-0000-0000-000000000000	400c0284-536a-462f-8ff7-06f022ffd773	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 20:07:22.933298+00	
00000000-0000-0000-0000-000000000000	a0360087-a98f-4610-9fdb-e02b1a8d1f1a	{"action":"token_refreshed","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 21:05:27.366816+00	
00000000-0000-0000-0000-000000000000	cb8ee449-460c-4dcc-ad88-b81bacf0f8c5	{"action":"token_revoked","actor_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 21:05:27.384969+00	
00000000-0000-0000-0000-000000000000	87580d5e-7734-4954-8240-5e1f61915b61	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 21:18:11.70399+00	
00000000-0000-0000-0000-000000000000	6ba38562-fa46-4176-ab8a-3c4c54640765	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 21:18:11.713169+00	
00000000-0000-0000-0000-000000000000	cb5f59a8-a152-4f99-9211-7ef3adb5de1c	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"osnaghi.prog@gmail.com","user_id":"abdd4070-cb33-4c5a-8903-dd2df7823cc3","user_phone":""}}	2025-10-14 21:45:22.634714+00	
00000000-0000-0000-0000-000000000000	75a44e2e-fbcd-44dc-add3-2971f7675ed2	{"action":"user_confirmation_requested","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-14 21:47:23.420076+00	
00000000-0000-0000-0000-000000000000	947b8db6-ee02-4baa-803f-be5d382834a6	{"action":"user_signedup","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-10-14 21:47:45.676501+00	
00000000-0000-0000-0000-000000000000	1f38bd35-9a45-4c78-8bd2-2f3b5a155bc4	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 21:49:14.79952+00	
00000000-0000-0000-0000-000000000000	abe1d692-e902-416c-98c5-7d1ad7acc18b	{"action":"user_confirmation_requested","actor_id":"6dd82cb7-9670-4244-91cc-9f150c5f064e","actor_name":"martin","actor_username":"domingoenfuego1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-14 22:14:40.347012+00	
00000000-0000-0000-0000-000000000000	9ef62e1d-ca34-4c8e-b510-7de7cf8d2ffc	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"domingoenfuego1@gmail.com","user_id":"6dd82cb7-9670-4244-91cc-9f150c5f064e","user_phone":""}}	2025-10-14 22:16:48.910876+00	
00000000-0000-0000-0000-000000000000	54ac15b2-469e-465a-98ba-bfc924837357	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 22:17:28.077126+00	
00000000-0000-0000-0000-000000000000	f912c579-c7cd-4514-b2bc-8cd96d8e0fe4	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 22:17:28.078031+00	
00000000-0000-0000-0000-000000000000	41b17d76-668c-4bbe-9af4-457e927d0f94	{"action":"user_confirmation_requested","actor_id":"2165439e-f1b5-4b22-a288-a49c1cdd77c4","actor_name":"martin","actor_username":"domingoenfuego1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-14 22:17:40.786448+00	
00000000-0000-0000-0000-000000000000	7e74163e-03aa-4bc8-ae33-0eb0b2b2c3b1	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"domingoenfuego1@gmail.com","user_id":"2165439e-f1b5-4b22-a288-a49c1cdd77c4","user_phone":""}}	2025-10-14 22:30:51.691945+00	
00000000-0000-0000-0000-000000000000	849a21d1-8da3-46b7-90a5-0cf75b5d4fc9	{"action":"user_confirmation_requested","actor_id":"a8affe73-af9b-49b0-a3a6-b1475741af5e","actor_name":"martin","actor_username":"domingoenfuego1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-14 22:31:13.501876+00	
00000000-0000-0000-0000-000000000000	261f5adb-f1c0-46fe-82fb-68d70ca950a6	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 22:31:20.293357+00	
00000000-0000-0000-0000-000000000000	8d0594d6-333b-48de-bdac-56cd46537207	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"domingoenfuego1@gmail.com","user_id":"a8affe73-af9b-49b0-a3a6-b1475741af5e","user_phone":""}}	2025-10-14 22:35:38.62655+00	
00000000-0000-0000-0000-000000000000	6b5987e3-7928-4f03-8fe4-f6f01b67a027	{"action":"user_confirmation_requested","actor_id":"1e4912e2-fec3-430d-96fc-3288cf681f63","actor_name":"martin","actor_username":"domingoenfuego1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-14 22:37:19.665883+00	
00000000-0000-0000-0000-000000000000	dc159116-bb57-4371-814e-f8774b878f19	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"domingoenfuego1@gmail.com","user_id":"1e4912e2-fec3-430d-96fc-3288cf681f63","user_phone":""}}	2025-10-14 22:38:23.24337+00	
00000000-0000-0000-0000-000000000000	68e8933d-06d6-42d5-9be6-a9628138e29e	{"action":"user_confirmation_requested","actor_id":"1537d3ff-7437-4c83-afa5-091a888cfc2b","actor_name":"martin","actor_username":"domingoenfuego1@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-10-14 22:38:55.612577+00	
00000000-0000-0000-0000-000000000000	ded46f19-0ed7-4426-8099-6f806690a6a4	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 22:47:43.731225+00	
00000000-0000-0000-0000-000000000000	8d255d29-f05d-4f30-a613-1068f15024de	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 22:47:43.74429+00	
00000000-0000-0000-0000-000000000000	07aadd58-e217-4f8a-a8b8-4c896f54a94c	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 22:53:42.236886+00	
00000000-0000-0000-0000-000000000000	32f64569-79b3-4952-8023-80969464c0e5	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 22:53:42.251014+00	
00000000-0000-0000-0000-000000000000	8dfc70fa-b7a5-44b2-b423-e7cfbe7a8a04	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-14 22:53:44.251631+00	
00000000-0000-0000-0000-000000000000	cd58de4e-508d-4662-a56d-885eb86484ec	{"action":"logout","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-14 23:20:29.297459+00	
00000000-0000-0000-0000-000000000000	7efeac1d-fba9-4484-90a9-fa81281b9091	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 23:20:48.023362+00	
00000000-0000-0000-0000-000000000000	78a7b057-219a-4324-9e15-9a9322366ac8	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 23:42:08.623967+00	
00000000-0000-0000-0000-000000000000	a1ed019e-ddd9-416c-b3ad-2f823e4858a7	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 23:42:08.63756+00	
00000000-0000-0000-0000-000000000000	6c3fbd07-1556-47d1-b44e-db82f5991073	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-14 23:43:54.318331+00	
00000000-0000-0000-0000-000000000000	89e9eb59-f2ce-42ff-bc05-8a41d50f9f21	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 23:45:46.267139+00	
00000000-0000-0000-0000-000000000000	afef3f52-f493-4589-b30c-2dbb841ad990	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 23:45:46.270446+00	
00000000-0000-0000-0000-000000000000	ed3aad44-2631-464c-87bf-6c2e56135687	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 23:53:18.647997+00	
00000000-0000-0000-0000-000000000000	0115bebc-ec16-4c50-8754-43687f03815b	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-14 23:53:18.653983+00	
00000000-0000-0000-0000-000000000000	e5483079-66ac-45ff-bd34-620312324b7b	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 00:19:05.451005+00	
00000000-0000-0000-0000-000000000000	82679e10-a26a-443e-b96a-2b05146f8b99	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 00:19:05.462365+00	
00000000-0000-0000-0000-000000000000	c880e229-d349-41aa-847c-0bf190d2f299	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 00:42:25.30235+00	
00000000-0000-0000-0000-000000000000	6e9f38c7-0438-478d-9e3b-783528b3f592	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 00:42:25.320122+00	
00000000-0000-0000-0000-000000000000	137bc0e2-9721-4bb2-9efb-17e5c95b102e	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 01:00:35.749001+00	
00000000-0000-0000-0000-000000000000	75e596cc-c554-43ba-ab77-d07887552457	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 01:00:35.755991+00	
00000000-0000-0000-0000-000000000000	ce2fb27d-76c0-4b61-9945-e6046aaf392f	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 01:09:31.894274+00	
00000000-0000-0000-0000-000000000000	2ab9efae-9f43-4f7e-8c05-09f53ce5e308	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 01:10:19.855324+00	
00000000-0000-0000-0000-000000000000	765b98dd-8ffb-45a2-9f7f-d0f9af1cac9f	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 01:11:07.523367+00	
00000000-0000-0000-0000-000000000000	541271f5-19a7-4778-8af6-828afca39644	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 01:18:59.207939+00	
00000000-0000-0000-0000-000000000000	c012f52d-c77c-49a5-84aa-3e1705012aaa	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 01:20:23.462586+00	
00000000-0000-0000-0000-000000000000	7a6125af-cafa-4ef4-9f9e-bfaff9e2bb92	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 01:30:42.527396+00	
00000000-0000-0000-0000-000000000000	dff8415d-24dc-4837-b47a-f4e8d749a2d7	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 01:31:04.388784+00	
00000000-0000-0000-0000-000000000000	f2e92007-fd48-41a7-a7e0-1eafda71a098	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 02:19:26.584915+00	
00000000-0000-0000-0000-000000000000	0ef38d67-6e95-4ee5-817d-7ce141fcccd5	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 02:37:28.563103+00	
00000000-0000-0000-0000-000000000000	53151318-83be-43b8-a791-e4253ae1fb8d	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 02:41:07.994104+00	
00000000-0000-0000-0000-000000000000	1fa58ed9-8691-4f4d-a7cc-18ff79042a39	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 05:22:58.954463+00	
00000000-0000-0000-0000-000000000000	b26ce8f6-92a4-4aa4-bdb7-96ae49ba5b35	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 05:44:22.738809+00	
00000000-0000-0000-0000-000000000000	a39ca30d-53db-4677-82d8-88da8a267b18	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 05:45:56.835666+00	
00000000-0000-0000-0000-000000000000	1e0d02db-7849-4fd8-b99d-644ac2db5744	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 05:58:55.28203+00	
00000000-0000-0000-0000-000000000000	102ced5a-1f83-46fb-80c6-612cfe7e646f	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 06:15:25.986572+00	
00000000-0000-0000-0000-000000000000	273ac561-6a29-4931-aace-226b9bf4e2fb	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 06:18:20.878798+00	
00000000-0000-0000-0000-000000000000	5a11e842-afc1-4f53-9bec-b9d8a1182ee3	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 07:17:32.661557+00	
00000000-0000-0000-0000-000000000000	937b6eee-d13c-4257-8854-1062dc563288	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 07:17:32.68106+00	
00000000-0000-0000-0000-000000000000	2603e34c-700d-4be6-905e-ec9c9dbc0ad1	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 07:19:07.175137+00	
00000000-0000-0000-0000-000000000000	01c38e4b-91d2-4b91-895e-cd67210baa2a	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 11:09:10.853719+00	
00000000-0000-0000-0000-000000000000	525bbd84-631f-42b8-87a1-4cd53ead82b5	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 11:09:10.883584+00	
00000000-0000-0000-0000-000000000000	99566f19-6a53-4579-ba89-b3f133941bd2	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 12:07:20.451927+00	
00000000-0000-0000-0000-000000000000	b461d8e5-2b35-49b2-9a5d-57b2567c5143	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 12:07:20.466937+00	
00000000-0000-0000-0000-000000000000	668e9f49-9e33-4f0f-8cf0-b637f603bf10	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 13:05:51.314854+00	
00000000-0000-0000-0000-000000000000	4e967f51-785c-498b-afa1-d82e0ea242e9	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 13:05:51.331996+00	
00000000-0000-0000-0000-000000000000	1eb2e61d-20c9-4a5a-9a2c-ba2ed440be76	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 13:28:59.744514+00	
00000000-0000-0000-0000-000000000000	5935e0a0-7adc-4550-a847-100a5a932264	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 13:28:59.756305+00	
00000000-0000-0000-0000-000000000000	f9db725d-2c38-4cfc-b0ac-d90765e413dc	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 13:29:15.191283+00	
00000000-0000-0000-0000-000000000000	09c34c8b-5ced-401b-9d8b-7b4daf541716	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 14:04:52.195655+00	
00000000-0000-0000-0000-000000000000	57ca0eab-9935-4c87-97d1-c80a3244d03c	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 14:04:52.215686+00	
00000000-0000-0000-0000-000000000000	c453274a-7f68-4ab0-ab48-71b0a359e027	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 14:18:42.169037+00	
00000000-0000-0000-0000-000000000000	4dc19bcb-9771-4da2-955a-c036e2c12720	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 15:03:12.715886+00	
00000000-0000-0000-0000-000000000000	53e5092c-1692-484b-99b2-f3cac7e49377	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 15:03:12.739866+00	
00000000-0000-0000-0000-000000000000	f2bd76e3-cb93-4987-ba49-f89d3d164068	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 16:17:49.354583+00	
00000000-0000-0000-0000-000000000000	e89a35f8-eb17-467e-84fe-c265d08cb791	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 16:17:49.37426+00	
00000000-0000-0000-0000-000000000000	ea7bfc4e-41b0-4755-9afc-bbee9b5d75b8	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 16:17:56.744307+00	
00000000-0000-0000-0000-000000000000	f903e0e8-efa7-4c2c-96a2-18f269c40803	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 16:47:21.046945+00	
00000000-0000-0000-0000-000000000000	ff9dbe3f-af00-4fb5-8f3d-a6b2d5ec4369	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 16:47:21.059265+00	
00000000-0000-0000-0000-000000000000	ffe3ae35-2906-4bb5-94a4-cd5156b83555	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-15 18:10:44.379013+00	
00000000-0000-0000-0000-000000000000	143a1deb-6679-482c-b1c0-43eb5b8c39c3	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 18:14:29.906713+00	
00000000-0000-0000-0000-000000000000	e0e5cb99-ed6c-432f-a867-a68e40501faf	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-15 18:14:46.120854+00	
00000000-0000-0000-0000-000000000000	ac449036-0637-4712-82b0-301ee3ed02dd	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 18:15:13.468556+00	
00000000-0000-0000-0000-000000000000	70ea4145-0073-42e5-ab07-a29a05a30180	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 20:09:58.237631+00	
00000000-0000-0000-0000-000000000000	6b5468e0-cf96-44ba-aa9d-9c0a90cd1f81	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-15 20:09:58.253568+00	
00000000-0000-0000-0000-000000000000	eb94ca9e-6640-4539-875b-2ef6a066799c	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro_osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 21:04:54.95541+00	
00000000-0000-0000-0000-000000000000	78465e1b-27ab-4c4c-ab4d-9a253b4675d3	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-15 21:05:02.610374+00	
00000000-0000-0000-0000-000000000000	cb7a16c1-bffe-4b22-9e6b-452daf603d46	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 21:17:22.786074+00	
00000000-0000-0000-0000-000000000000	64b18b35-b4d0-4674-9a9e-393087455827	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-15 21:17:50.103834+00	
00000000-0000-0000-0000-000000000000	e20faf10-46f5-4d79-a9c8-7567dde38398	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 21:18:43.809087+00	
00000000-0000-0000-0000-000000000000	b7a4fd97-237d-40e2-941d-ec9ce49f70b6	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-15 21:18:57.074059+00	
00000000-0000-0000-0000-000000000000	03b9aced-c47d-4a68-92c7-1a7c6bbce2b5	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 21:41:47.949273+00	
00000000-0000-0000-0000-000000000000	7c85b047-4eb6-4ab0-9b88-b153d0edb6f9	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-15 22:02:21.191345+00	
00000000-0000-0000-0000-000000000000	9efeb247-dc4c-4943-899e-7e7864259955	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 22:05:23.08598+00	
00000000-0000-0000-0000-000000000000	8e8155d1-50cb-40b0-bd69-0b68364b0237	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-15 22:10:59.349513+00	
00000000-0000-0000-0000-000000000000	b81d55f0-a6bc-48da-89dc-681ca4dfea17	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-15 22:13:18.511745+00	
00000000-0000-0000-0000-000000000000	71f0ca24-e0ee-40bf-8c82-e5e31a0e23ba	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-15 22:39:28.689666+00	
00000000-0000-0000-0000-000000000000	758bc4fb-b8e6-4bbc-8a89-663c28575241	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 02:30:11.145968+00	
00000000-0000-0000-0000-000000000000	c50661ef-4085-4ca2-9336-e4184cfb38fe	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 02:30:11.179886+00	
00000000-0000-0000-0000-000000000000	43de2aa9-1281-4b1c-aa12-468d807895ec	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 06:49:08.912138+00	
00000000-0000-0000-0000-000000000000	651e7d4f-06b9-4591-b459-c29f1cd2a2b9	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 06:49:08.925639+00	
00000000-0000-0000-0000-000000000000	82c06c67-0006-4d80-a4fb-598ef13f1019	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 07:47:13.169635+00	
00000000-0000-0000-0000-000000000000	ef39a2f8-aeb0-40cb-979c-2da7798b5349	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 07:47:13.182689+00	
00000000-0000-0000-0000-000000000000	00f274cf-e466-46a4-8703-7f2e049637ef	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 08:45:45.69146+00	
00000000-0000-0000-0000-000000000000	876f3bec-68f1-4b6b-a147-0876e408859d	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 08:45:45.70278+00	
00000000-0000-0000-0000-000000000000	0f6c79cd-65af-4cad-bfe7-d477b42bfc46	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 09:43:55.400858+00	
00000000-0000-0000-0000-000000000000	d1d9c9ee-0004-4fbd-9061-8c26ad3cda5c	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 09:43:55.413468+00	
00000000-0000-0000-0000-000000000000	bb36fe63-d323-4ea6-8554-364155d77a14	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 10:41:58.392543+00	
00000000-0000-0000-0000-000000000000	b1123c54-199a-4860-8f1a-1f2a34868f73	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 10:41:58.410053+00	
00000000-0000-0000-0000-000000000000	844b763c-aff8-4f13-ad43-06de68c7eb09	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 11:40:11.311812+00	
00000000-0000-0000-0000-000000000000	1b833698-63ec-49e2-a77c-8f86965c6b25	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 11:40:11.32312+00	
00000000-0000-0000-0000-000000000000	c253436c-04ff-43ad-97b2-6efcf93eaa21	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 12:38:13.709962+00	
00000000-0000-0000-0000-000000000000	aee687c5-a1ed-401e-acc9-fe7825d01d47	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-16 12:38:13.724821+00	
00000000-0000-0000-0000-000000000000	69d967f4-7b9c-4d57-a08f-4d7be08cec79	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-17 04:25:06.922338+00	
00000000-0000-0000-0000-000000000000	f6cb8fe0-230a-4329-baa9-d44acd128e65	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-17 04:25:06.945485+00	
00000000-0000-0000-0000-000000000000	04f7d5e7-f1b7-4c93-a6d2-f2690697628c	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"domingoenfuego1@gmail.com","user_id":"1537d3ff-7437-4c83-afa5-091a888cfc2b","user_phone":""}}	2025-10-17 13:29:35.186129+00	
00000000-0000-0000-0000-000000000000	d416ef51-3293-4b28-9897-24a5379c98ea	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-17 13:59:02.372876+00	
00000000-0000-0000-0000-000000000000	041a91f1-2de5-43d8-917c-98aec35214da	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-17 13:59:02.3916+00	
00000000-0000-0000-0000-000000000000	fafd70d7-d540-42ea-a1be-6da28f76259e	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-17 13:59:09.714538+00	
00000000-0000-0000-0000-000000000000	75734313-71ab-450b-8b4c-a13288fbd4a0	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-17 15:23:25.365781+00	
00000000-0000-0000-0000-000000000000	84abb8f9-09d1-44eb-9f4e-c22e03c32967	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-17 15:23:25.394094+00	
00000000-0000-0000-0000-000000000000	e2bb2f9b-3666-478d-af55-ad2a79ebad5d	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-18 02:36:43.507998+00	
00000000-0000-0000-0000-000000000000	87ef63d3-4670-40e0-9737-847097110845	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-18 02:36:44.578227+00	
00000000-0000-0000-0000-000000000000	d6fd0478-e26b-4f7e-84e9-241339a827be	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 04:00:38.896546+00	
00000000-0000-0000-0000-000000000000	6fa24f81-bd7c-480e-9666-6dc298be02fa	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 04:00:38.910449+00	
00000000-0000-0000-0000-000000000000	cbc4f81e-be3e-4076-bbe2-228cb5526ea6	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 05:55:18.942002+00	
00000000-0000-0000-0000-000000000000	154d0948-3209-4d1c-b85f-43b7063301ff	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-18 05:59:15.519388+00	
00000000-0000-0000-0000-000000000000	be4935b9-41c2-42ae-bfef-2414c4569da8	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 05:59:20.273118+00	
00000000-0000-0000-0000-000000000000	6521b5c9-f390-45e4-8769-77c0b2bb6855	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 06:00:31.45676+00	
00000000-0000-0000-0000-000000000000	87889004-2107-496b-b240-1655621be94c	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 06:14:08.731024+00	
00000000-0000-0000-0000-000000000000	c2f62d9e-ecff-4a67-b078-538dc4960db1	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 06:24:34.949342+00	
00000000-0000-0000-0000-000000000000	5e7f5876-c7cb-4484-844b-1ff306500e88	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 06:25:29.620291+00	
00000000-0000-0000-0000-000000000000	7f114079-ecc1-40da-a83d-6e37e8f8b42b	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 07:10:11.622911+00	
00000000-0000-0000-0000-000000000000	ea282c08-578c-4991-b81f-ae60d691de76	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 09:30:11.064842+00	
00000000-0000-0000-0000-000000000000	242c719f-b507-4f90-9ef4-269a467100e9	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 09:30:11.087506+00	
00000000-0000-0000-0000-000000000000	626d7375-d938-4954-8b60-428d416206e4	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 13:06:54.621099+00	
00000000-0000-0000-0000-000000000000	b119cd00-800c-4fb1-8ba0-165a0e78a16f	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 13:06:54.646841+00	
00000000-0000-0000-0000-000000000000	38183378-acf5-4566-a7f2-2ab9ec366198	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 22:43:03.062919+00	
00000000-0000-0000-0000-000000000000	b3ea8d71-26a5-4871-bb73-0baae8f15578	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 22:43:03.093763+00	
00000000-0000-0000-0000-000000000000	03eaa289-eeb6-4dd3-b070-5c13912dc888	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 22:43:05.511862+00	
00000000-0000-0000-0000-000000000000	7a4dc53e-8270-4032-b2c8-ea1944198fde	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 22:56:22.884468+00	
00000000-0000-0000-0000-000000000000	46a224d2-8117-4e68-8626-014648d65abd	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 23:02:18.265032+00	
00000000-0000-0000-0000-000000000000	bf5e684a-eea4-44a5-9267-1fc009546bf3	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-18 23:02:18.268391+00	
00000000-0000-0000-0000-000000000000	47d2d280-f7a3-488b-b007-3ea6ae41bc0d	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-18 23:02:25.906475+00	
00000000-0000-0000-0000-000000000000	5cdb5e43-92a9-4e4c-87ab-eb2385db9ec8	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-18 23:03:44.978801+00	
00000000-0000-0000-0000-000000000000	d5502efb-5bfa-4e16-a3ae-d592f3b1602d	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 23:04:49.96521+00	
00000000-0000-0000-0000-000000000000	a367ddca-541a-4e25-a408-36011e81e638	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 23:42:46.169197+00	
00000000-0000-0000-0000-000000000000	90da5f94-d13f-4571-98ea-edcba4f513c0	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 23:50:01.868018+00	
00000000-0000-0000-0000-000000000000	585e96ea-f48b-407e-a93b-ab28afda0b07	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 23:52:40.10171+00	
00000000-0000-0000-0000-000000000000	9a8f805f-f79c-42c2-a718-ada29007498f	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 23:54:36.095146+00	
00000000-0000-0000-0000-000000000000	d143de84-52d9-4339-b544-ba3e46adbce4	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 23:58:36.223687+00	
00000000-0000-0000-0000-000000000000	a5662b72-bf42-473f-8161-92259854591a	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-18 23:59:49.228446+00	
00000000-0000-0000-0000-000000000000	536a8e68-888e-4c25-a1ec-617a077a8b79	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-19 00:12:48.960367+00	
00000000-0000-0000-0000-000000000000	945f87b2-1916-4390-b24d-303932b08c91	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 00:44:36.554242+00	
00000000-0000-0000-0000-000000000000	58038676-a866-44fc-b158-4a6c8b07d12f	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 00:44:36.577498+00	
00000000-0000-0000-0000-000000000000	a9f4104d-0faf-41ed-9d9f-f221065bccf5	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-19 00:44:41.993865+00	
00000000-0000-0000-0000-000000000000	992ce6cb-5338-4f1f-8556-6177c7736639	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 01:10:57.166672+00	
00000000-0000-0000-0000-000000000000	4acb836f-698f-4774-877b-ff1eac308315	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 01:10:57.176262+00	
00000000-0000-0000-0000-000000000000	710934ba-a60d-41d8-87ff-7089017d8ca0	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 01:43:09.408482+00	
00000000-0000-0000-0000-000000000000	bd046b34-f07d-465f-8043-e550cf0b4189	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 01:43:09.426551+00	
00000000-0000-0000-0000-000000000000	c3969c52-bb74-4b4e-a5b6-48434c6e7c08	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 03:07:55.279945+00	
00000000-0000-0000-0000-000000000000	f393c932-057c-4799-877c-aad18f4eacc4	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 03:07:55.296259+00	
00000000-0000-0000-0000-000000000000	d7605f95-83b7-45fe-b275-299d39d99b94	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 04:23:48.044987+00	
00000000-0000-0000-0000-000000000000	a7bf05a1-3251-4d6c-9aa8-c9cc39bf9775	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 04:23:48.058664+00	
00000000-0000-0000-0000-000000000000	69b7c5ae-c246-436a-8974-44e8d53267ee	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 04:37:56.736058+00	
00000000-0000-0000-0000-000000000000	41a2119f-0079-4a37-aec9-a0972358bd8a	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 04:37:56.748015+00	
00000000-0000-0000-0000-000000000000	2d1e496b-de12-411f-80fb-8ec74f409244	{"action":"user_signedup","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-10-19 04:41:58.740571+00	
00000000-0000-0000-0000-000000000000	b64c6541-aaed-4008-8bbf-80b35585c7d4	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 05:40:07.2704+00	
00000000-0000-0000-0000-000000000000	5f6b0bb3-4387-4e47-a2fb-ca235e449393	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 05:40:07.299556+00	
00000000-0000-0000-0000-000000000000	376b95d5-85ce-45fc-993a-138984395d68	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 06:38:23.563361+00	
00000000-0000-0000-0000-000000000000	f332e714-f20f-443f-b40b-29a7a854111e	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 06:38:23.574886+00	
00000000-0000-0000-0000-000000000000	bc748b33-4144-459e-a2fa-620d3bca8abd	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 07:46:22.986837+00	
00000000-0000-0000-0000-000000000000	68432af4-dff2-463f-8d7d-11815952881c	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 07:46:23.006208+00	
00000000-0000-0000-0000-000000000000	bb61d3a2-ac8b-4f9c-acfa-b2b57399259f	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 08:44:24.988334+00	
00000000-0000-0000-0000-000000000000	60ee8a98-1295-4023-ac0f-a54d69151d3e	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 08:44:25.009211+00	
00000000-0000-0000-0000-000000000000	dd138387-c6eb-436d-b88a-b304e60ac325	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 09:48:08.340354+00	
00000000-0000-0000-0000-000000000000	e231faf3-a01a-4545-9219-655c95d9a266	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 09:48:08.375809+00	
00000000-0000-0000-0000-000000000000	505c88c7-1131-4660-8724-b3a5d416136c	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 09:48:08.723971+00	
00000000-0000-0000-0000-000000000000	3e7ac8a2-010b-4bee-aade-8ffab50bc4dd	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 10:46:37.214934+00	
00000000-0000-0000-0000-000000000000	61fa1d79-762c-4780-ac6c-659fdf4c23a4	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 10:46:37.234769+00	
00000000-0000-0000-0000-000000000000	8b9dae02-6614-4b48-aa62-c05c4461aefc	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 11:44:56.779087+00	
00000000-0000-0000-0000-000000000000	19561a9b-5daa-469c-b74e-79db0aafb88a	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 11:44:56.794423+00	
00000000-0000-0000-0000-000000000000	a7b4257b-f4ac-455e-a0e0-ce0c31837c99	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 18:44:38.776544+00	
00000000-0000-0000-0000-000000000000	42a3f54d-4381-4623-8797-ef4d03c5945d	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 18:44:38.808694+00	
00000000-0000-0000-0000-000000000000	9aaaa35b-7bc5-482b-bc11-353db9a57506	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 19:42:59.004732+00	
00000000-0000-0000-0000-000000000000	594f1bde-27aa-4600-83af-de41516e86d9	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 19:42:59.017203+00	
00000000-0000-0000-0000-000000000000	13452c56-4cfa-4393-afba-1ee3bbd88af1	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 20:41:03.683691+00	
00000000-0000-0000-0000-000000000000	d73cdff2-c2f6-4802-9c59-33f2a8738d9b	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 20:41:03.697763+00	
00000000-0000-0000-0000-000000000000	0fd654c7-4b87-4ef1-ac31-a5e3fe601f16	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 21:39:14.750785+00	
00000000-0000-0000-0000-000000000000	f2f3d441-0016-4d29-9a32-452d37f3433f	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 21:39:14.766651+00	
00000000-0000-0000-0000-000000000000	01e2ec54-35de-4915-bff0-540baa912b3a	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 22:37:38.94213+00	
00000000-0000-0000-0000-000000000000	30cf73cc-3fef-4f8c-8ff7-2f7f65cb4ab3	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-19 22:37:38.96455+00	
00000000-0000-0000-0000-000000000000	5eca70ec-41a1-4b34-9fc8-c4e3321090f8	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 02:26:16.22492+00	
00000000-0000-0000-0000-000000000000	c667f4b8-4460-4a00-8cd3-9ebb0dd5c89c	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 02:26:16.237374+00	
00000000-0000-0000-0000-000000000000	43270098-2e3e-4043-8686-fef742e8e2ea	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 03:47:49.128839+00	
00000000-0000-0000-0000-000000000000	52b9363b-8777-4c29-b576-28bcb3514c2e	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 03:47:49.141494+00	
00000000-0000-0000-0000-000000000000	053348a5-5544-430a-b655-68cb2c134c36	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 04:45:57.920773+00	
00000000-0000-0000-0000-000000000000	807f09a7-6246-4b6e-9048-26023b79342d	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 04:45:57.93514+00	
00000000-0000-0000-0000-000000000000	135be375-fbb1-49ca-b00e-dd9af1b4136f	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 05:44:32.978695+00	
00000000-0000-0000-0000-000000000000	55bc14be-ca97-48f9-b583-92c41722063c	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 05:44:32.994903+00	
00000000-0000-0000-0000-000000000000	0fa23537-4962-42a6-922c-dde3fe13debe	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 07:23:14.553318+00	
00000000-0000-0000-0000-000000000000	32586fa4-fb04-41b5-83ab-a65eaa5e6abe	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 07:23:14.568914+00	
00000000-0000-0000-0000-000000000000	b433d099-250d-4de1-af9f-5ffc29de86a3	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 08:22:09.553312+00	
00000000-0000-0000-0000-000000000000	05c81e69-fff5-4ec5-af49-8e91c947659b	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 08:22:09.569547+00	
00000000-0000-0000-0000-000000000000	37185e20-ef2b-4bd8-9a51-95533a91d840	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 09:20:53.104427+00	
00000000-0000-0000-0000-000000000000	e7c2de9d-ae7e-497d-a938-ab46ea11f128	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 09:20:53.117222+00	
00000000-0000-0000-0000-000000000000	1a341c7c-8c17-4341-b8ce-43d29570fae2	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 10:19:27.49912+00	
00000000-0000-0000-0000-000000000000	1daf927e-04e8-4395-9309-ab3600c96622	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 10:19:27.514748+00	
00000000-0000-0000-0000-000000000000	0ea5c31a-8e63-4d48-93c5-a78e5906f599	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 11:19:33.883421+00	
00000000-0000-0000-0000-000000000000	ddc9ba9c-c0df-413a-a7cd-5370347d6b49	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 11:19:33.893682+00	
00000000-0000-0000-0000-000000000000	08e92d4b-6c9a-4167-8ded-f371be5cb490	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 12:18:06.838861+00	
00000000-0000-0000-0000-000000000000	c458ef87-9d3c-49b9-b73a-8bc68faee28a	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 12:18:06.846411+00	
00000000-0000-0000-0000-000000000000	9af0c3d1-8c72-4244-84a1-57884c8c26da	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 13:16:12.940677+00	
00000000-0000-0000-0000-000000000000	fcae925e-4948-4156-8863-212878c4d252	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 13:16:12.950084+00	
00000000-0000-0000-0000-000000000000	39cd54fd-60ed-4638-bcb7-81adf529f0a1	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 14:14:30.37504+00	
00000000-0000-0000-0000-000000000000	9bba9ae0-81fc-4fe9-a43f-75ae4babff0c	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 14:14:30.392059+00	
00000000-0000-0000-0000-000000000000	493b180b-3bcf-495d-ae8b-f8bb8dd2a806	{"action":"token_refreshed","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 15:24:26.318938+00	
00000000-0000-0000-0000-000000000000	5b790cf1-0399-4de5-b6bf-c42bf805f81a	{"action":"token_revoked","actor_id":"2317247e-c013-4f13-b676-cd40a75f9aa8","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.developer@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 15:24:26.350531+00	
00000000-0000-0000-0000-000000000000	7e115aec-b518-4b48-accb-622f660363c1	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-20 15:43:58.810603+00	
00000000-0000-0000-0000-000000000000	ecc4c049-9969-47a5-9581-459b7f20c121	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 17:14:06.631349+00	
00000000-0000-0000-0000-000000000000	91063cab-ffd1-4e92-95ca-5db56e12d555	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 17:14:06.648773+00	
00000000-0000-0000-0000-000000000000	3de083e3-8066-440f-90e4-8375d7150ba2	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 18:28:19.468352+00	
00000000-0000-0000-0000-000000000000	292fc06b-1899-463c-8926-ae4de2cabd1d	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 18:28:19.487203+00	
00000000-0000-0000-0000-000000000000	b3937601-8f7a-4361-ab11-b774b0457850	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 20:14:45.121691+00	
00000000-0000-0000-0000-000000000000	1ae22f77-5e56-491f-958c-e5cad6a829ab	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 20:14:45.139723+00	
00000000-0000-0000-0000-000000000000	7b21d284-a734-4471-a80c-bdbd73839c3c	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 21:15:46.67+00	
00000000-0000-0000-0000-000000000000	dd6e497d-edf4-4a53-b723-fe71c537d770	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 21:15:46.687749+00	
00000000-0000-0000-0000-000000000000	9bc0db85-a14f-48e5-a7f7-9ba54df291a4	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 21:59:22.744614+00	
00000000-0000-0000-0000-000000000000	1eaf21b0-92c5-4a11-a3f3-3dba717bf2f1	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 21:59:22.769303+00	
00000000-0000-0000-0000-000000000000	23830fce-2517-467d-a71a-d2fd5a4e8fe4	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-20 21:59:23.972084+00	
00000000-0000-0000-0000-000000000000	9bcad694-5b29-4612-9ee7-ad37b1d99429	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-20 22:02:52.545987+00	
00000000-0000-0000-0000-000000000000	c62e1883-d7dd-49de-824b-abf6a2dfc8f7	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 22:14:10.354447+00	
00000000-0000-0000-0000-000000000000	a181feb3-d34f-4392-89d7-deb2d356f733	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 22:14:10.36463+00	
00000000-0000-0000-0000-000000000000	435e4466-c736-4b7a-b91b-23061b356a09	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-20 22:18:47.148028+00	
00000000-0000-0000-0000-000000000000	954ae699-80c7-43c2-8dcf-a5ec46de9b11	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-20 22:20:07.790743+00	
00000000-0000-0000-0000-000000000000	bf997dc2-8913-48ab-b177-e2af8de914c2	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 23:12:22.380234+00	
00000000-0000-0000-0000-000000000000	2f28d762-d232-4963-8e9b-ac06128f0bc2	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 23:12:22.39988+00	
00000000-0000-0000-0000-000000000000	c43553f7-cdce-4ff2-ab86-9f5040cf2d91	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-20 23:17:55.30312+00	
00000000-0000-0000-0000-000000000000	8db9a756-9f32-4cdd-89be-b1517a058c0d	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-20 23:32:10.047448+00	
00000000-0000-0000-0000-000000000000	2b316c11-3a05-4932-9c9f-a510602b4549	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-20 23:32:20.041228+00	
00000000-0000-0000-0000-000000000000	77a679f1-564f-46c6-8e3a-1ab76920e780	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 23:38:36.846391+00	
00000000-0000-0000-0000-000000000000	bdf35ff0-4111-449a-9c1a-7f9fa688bf19	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-20 23:38:36.848856+00	
00000000-0000-0000-0000-000000000000	e8895142-43c2-4a70-8786-1048df1b98b8	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-20 23:54:10.969519+00	
00000000-0000-0000-0000-000000000000	7b048e34-dc2c-444a-b0e9-d41f66ad1f53	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 00:13:51.890373+00	
00000000-0000-0000-0000-000000000000	dfa1f493-34f2-4c8d-846c-2463ebe32c85	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 00:13:51.899536+00	
00000000-0000-0000-0000-000000000000	48f5750a-409b-4170-a397-6344adecedd8	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 00:52:36.764653+00	
00000000-0000-0000-0000-000000000000	9d8e48e4-be14-4fe0-9025-5f13ee191cf4	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 00:52:36.788194+00	
00000000-0000-0000-0000-000000000000	4ff16ee0-466b-40e8-a057-b42f5c4f172e	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 01:14:56.281222+00	
00000000-0000-0000-0000-000000000000	9d098e10-b671-46cc-a9fe-a7bcb1454537	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 01:14:56.288079+00	
00000000-0000-0000-0000-000000000000	cc9e9ef2-89b2-4326-b858-122bb46bdae1	{"action":"logout","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-21 01:21:55.963226+00	
00000000-0000-0000-0000-000000000000	2dd148b3-5244-4eae-a90b-1d5ff9ae8d44	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-21 01:22:09.341412+00	
00000000-0000-0000-0000-000000000000	52b6aa33-f505-424c-a94a-865ab6f6f4b4	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 02:20:14.19234+00	
00000000-0000-0000-0000-000000000000	4fde44f8-3746-461a-8033-9e4a52843306	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 02:20:14.20891+00	
00000000-0000-0000-0000-000000000000	1bced52f-b81d-48d4-94ce-d2dec443ebf0	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 02:32:23.414738+00	
00000000-0000-0000-0000-000000000000	21ad60ef-c417-420c-a0ca-5c55ab936b69	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 02:32:23.427273+00	
00000000-0000-0000-0000-000000000000	4d71a54c-20f8-4398-acc8-e58c291aef19	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 03:31:11.009667+00	
00000000-0000-0000-0000-000000000000	a923731e-d643-41e8-b5b6-0ae3972f583e	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 03:31:11.036559+00	
00000000-0000-0000-0000-000000000000	8d65d949-622f-488a-810e-e52389e547f8	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 04:29:36.389218+00	
00000000-0000-0000-0000-000000000000	68049635-ec7c-46ee-a861-9fffe99a3b1d	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 04:29:36.408319+00	
00000000-0000-0000-0000-000000000000	039a46d8-54b9-4683-915f-39af1e917f5c	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 05:27:53.241446+00	
00000000-0000-0000-0000-000000000000	ff492d49-fd0b-493a-81f5-ac1fab53da94	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 05:27:53.258529+00	
00000000-0000-0000-0000-000000000000	8fcf74ff-cb45-4dc2-88b1-31d7dd4c69ff	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 06:26:28.576074+00	
00000000-0000-0000-0000-000000000000	de280e3b-e4e1-4702-8d34-f2ebcccd922d	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 06:26:28.5904+00	
00000000-0000-0000-0000-000000000000	3ff263c9-5658-4e4b-b743-01e267bbb8d4	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 07:24:45.591418+00	
00000000-0000-0000-0000-000000000000	fb689ccc-ab2a-48ea-9e6a-98ad3b13f120	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 07:24:45.604867+00	
00000000-0000-0000-0000-000000000000	f57f6520-2c0f-4025-b794-b502502df0bc	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 08:22:53.582236+00	
00000000-0000-0000-0000-000000000000	ab8b6fb4-a946-4176-ba4b-c386fff02ef4	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 08:22:53.598649+00	
00000000-0000-0000-0000-000000000000	e8c3a3fd-d001-48c6-a8b7-23ac371f042b	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 09:31:21.882477+00	
00000000-0000-0000-0000-000000000000	7d534bab-8d8a-4801-a3e9-7f23bd7048e1	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 09:31:21.897858+00	
00000000-0000-0000-0000-000000000000	caa2187a-3ac5-415c-8039-9f557ef24f07	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 10:29:31.542363+00	
00000000-0000-0000-0000-000000000000	1eba2599-6a27-4774-bb9a-c4bf5442e55b	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 10:29:31.55366+00	
00000000-0000-0000-0000-000000000000	1a8ab9ef-b564-4bf7-9512-9d0acd8c87b1	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 11:27:40.711736+00	
00000000-0000-0000-0000-000000000000	f366e4d8-dc8c-465d-85d4-b1e9997ac1d2	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 11:27:40.729102+00	
00000000-0000-0000-0000-000000000000	2d92b0c1-aaa8-45a7-b72c-8b739463ce64	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 12:26:07.017789+00	
00000000-0000-0000-0000-000000000000	12dd5561-9dc5-41bf-9277-f14d54f32872	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 12:26:07.032727+00	
00000000-0000-0000-0000-000000000000	13af400a-6894-4659-afde-12722cfd9eac	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 13:24:28.822605+00	
00000000-0000-0000-0000-000000000000	cb62f075-c527-47ac-b4ed-0ec89907b006	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 13:24:28.835199+00	
00000000-0000-0000-0000-000000000000	c420c299-b108-41c3-b8d2-3b50c0811cf8	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 14:22:55.790902+00	
00000000-0000-0000-0000-000000000000	becfea5a-a0db-47f1-98a3-38303782b3e0	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 14:22:55.806109+00	
00000000-0000-0000-0000-000000000000	8cfef761-92db-4a86-b222-36eefb2061a5	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 15:21:08.338576+00	
00000000-0000-0000-0000-000000000000	bce3521e-d172-4c7f-bf73-0ccc8cec17da	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 15:21:08.353064+00	
00000000-0000-0000-0000-000000000000	6d8a62d7-e16f-4eb8-9fa6-9e74950b51d9	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 20:32:00.331595+00	
00000000-0000-0000-0000-000000000000	fe68f422-eede-4c73-a41c-dfa1a16a0b37	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 20:32:00.356814+00	
00000000-0000-0000-0000-000000000000	8ce201d6-7023-4ace-b26f-2cb3acf2ce06	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 21:07:23.168601+00	
00000000-0000-0000-0000-000000000000	1a4110b4-ea75-4fbc-8401-0b69a1014306	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 21:07:23.177342+00	
00000000-0000-0000-0000-000000000000	e0fc1cce-170f-4994-8d6c-9e36e30cae50	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 22:08:17.798115+00	
00000000-0000-0000-0000-000000000000	645d2238-e914-4f93-817c-f291be992234	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 22:08:17.811518+00	
00000000-0000-0000-0000-000000000000	76934d35-f3d0-49ef-8015-72cea89b9811	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 22:30:49.902547+00	
00000000-0000-0000-0000-000000000000	924b2e30-6cc5-4ad6-9d9d-4080231e07be	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 22:30:49.911735+00	
00000000-0000-0000-0000-000000000000	8021201e-64ce-4aa0-a349-1fc516c3e1db	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 23:28:57.844457+00	
00000000-0000-0000-0000-000000000000	5bb3cf78-61ab-4175-9806-7d5ae368abbf	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-21 23:28:57.864033+00	
00000000-0000-0000-0000-000000000000	db489864-d179-45c1-8178-13af8340c0a4	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 00:26:58.541194+00	
00000000-0000-0000-0000-000000000000	5e6add8c-cfa7-4309-9044-41a784bccd73	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 00:26:58.55851+00	
00000000-0000-0000-0000-000000000000	1a643da3-03ba-4571-93e4-62e38ec5fc67	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 01:25:20.081335+00	
00000000-0000-0000-0000-000000000000	2f98f826-7544-4a0c-ae31-b8fd636a191f	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 01:25:20.097758+00	
00000000-0000-0000-0000-000000000000	7fb9beb3-1a2a-49f3-8c18-b6872b2a2d22	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 02:23:37.470037+00	
00000000-0000-0000-0000-000000000000	608fc1f2-ea36-4338-b689-6f78f11b75a0	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 02:23:37.490073+00	
00000000-0000-0000-0000-000000000000	d57eb62e-65b0-4494-afb8-f40c76b661d2	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-22 02:28:51.307035+00	
00000000-0000-0000-0000-000000000000	301694ea-013c-4bc8-a1f3-ba7ac840a3ec	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-22 02:29:16.952445+00	
00000000-0000-0000-0000-000000000000	967bd419-4f72-4b13-8fed-61271806d741	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-22 02:39:01.725553+00	
00000000-0000-0000-0000-000000000000	690c36fd-2f9c-42e2-a39f-a0a724b43d65	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-22 02:48:11.749722+00	
00000000-0000-0000-0000-000000000000	6140b421-7689-4370-a371-b674eb06f053	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-22 02:52:32.257571+00	
00000000-0000-0000-0000-000000000000	ff17561c-a50b-4623-a5e2-c0970e6f2ad2	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-22 03:13:27.223945+00	
00000000-0000-0000-0000-000000000000	1e4a6df7-7419-4f2e-837e-52b79ac7326f	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-22 03:13:39.028884+00	
00000000-0000-0000-0000-000000000000	b9c72c6b-4329-4750-be26-c5a0d4c9f891	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 03:30:05.431966+00	
00000000-0000-0000-0000-000000000000	149a8c4c-1331-491e-b25b-431c202ed84d	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 03:30:05.442831+00	
00000000-0000-0000-0000-000000000000	25052afe-3608-4608-be12-79fe3404c7e9	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-22 03:30:15.129313+00	
00000000-0000-0000-0000-000000000000	d8532dd2-2c4f-4a55-8beb-e135a38141c2	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 04:11:57.654631+00	
00000000-0000-0000-0000-000000000000	3d45ff87-651c-45d7-a2cf-5fe6a2f9e76b	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 04:11:57.669771+00	
00000000-0000-0000-0000-000000000000	b2c07c97-0229-43bb-98f1-325a841eea11	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-22 04:15:10.911703+00	
00000000-0000-0000-0000-000000000000	932ffd92-bd45-401b-adaf-e688a0df3794	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 05:10:02.504204+00	
00000000-0000-0000-0000-000000000000	6006dd64-f43d-4acd-8735-dc911083f9d0	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 05:10:02.524507+00	
00000000-0000-0000-0000-000000000000	9d2aa491-b646-48f3-8d16-1274d3be2e19	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 06:12:58.65477+00	
00000000-0000-0000-0000-000000000000	b3fc3776-5209-4fce-a422-28c2ff3a3c83	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 06:12:58.674045+00	
00000000-0000-0000-0000-000000000000	ce1f442d-5013-4fa8-9488-3e98f1c9a373	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 13:44:40.060328+00	
00000000-0000-0000-0000-000000000000	02482700-a9d6-4ec0-945a-dfc7ba85c15b	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 13:44:40.092068+00	
00000000-0000-0000-0000-000000000000	01fe1ae1-c006-4db4-b76d-63622780d02f	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-22 13:44:46.22378+00	
00000000-0000-0000-0000-000000000000	435beba7-b2f1-4073-8cfc-ef507cb0c3fa	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-22 13:51:41.892366+00	
00000000-0000-0000-0000-000000000000	6a3ed1ff-93c8-4a15-a5a2-96c9d1243b79	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-22 13:52:05.854832+00	
00000000-0000-0000-0000-000000000000	f117d467-0741-4b0e-8114-c93986ee585e	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-22 13:54:51.325402+00	
00000000-0000-0000-0000-000000000000	1c90b9cc-3194-4cb8-abdf-e9c03733e183	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-22 14:27:23.976907+00	
00000000-0000-0000-0000-000000000000	7a274c6a-9c08-43c7-9ff8-001685463d09	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-22 14:27:32.579921+00	
00000000-0000-0000-0000-000000000000	23b7a206-8326-40f4-befb-04e4ce771fee	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-22 14:33:09.914332+00	
00000000-0000-0000-0000-000000000000	3310f997-df69-4c28-b46c-1d37ae089405	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 21:15:08.057298+00	
00000000-0000-0000-0000-000000000000	eedfbd44-1922-4c62-bc61-970b4f936612	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 21:15:08.08198+00	
00000000-0000-0000-0000-000000000000	1f67132d-19d6-4383-9f77-c3284f237dab	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 22:13:20.28969+00	
00000000-0000-0000-0000-000000000000	502352c4-1013-421e-b3c5-323f74034ff6	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 22:13:20.305867+00	
00000000-0000-0000-0000-000000000000	07f1b86c-9ee9-4f2b-b660-642ae18ef5aa	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 23:11:50.282717+00	
00000000-0000-0000-0000-000000000000	8dfde062-fc9d-4bc2-be25-f007875d16a9	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-22 23:11:50.302858+00	
00000000-0000-0000-0000-000000000000	3d90b8d5-b834-4045-b4ad-b280389cc263	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 00:09:53.342637+00	
00000000-0000-0000-0000-000000000000	51fa7be4-273b-4cd6-a9df-5ace856e6710	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 00:09:53.353296+00	
00000000-0000-0000-0000-000000000000	253ef769-6100-4147-a833-88df216a1695	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 01:43:50.45833+00	
00000000-0000-0000-0000-000000000000	2d9dece9-d5f0-4605-aad6-9054a4e6f808	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 01:43:50.482202+00	
00000000-0000-0000-0000-000000000000	acd95fec-d302-4b42-b194-e14355f295bd	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 02:44:50.609331+00	
00000000-0000-0000-0000-000000000000	f5305292-62b3-4fd4-a1b6-d181fb632b60	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 02:44:50.632918+00	
00000000-0000-0000-0000-000000000000	5abbc03a-946d-4815-9d0f-df15123267d2	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 03:43:25.385696+00	
00000000-0000-0000-0000-000000000000	4e002c7e-483a-4005-8546-6a7cc965cda2	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 03:43:25.397447+00	
00000000-0000-0000-0000-000000000000	ef9c94ad-3783-4d01-880f-70a59cade128	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 04:44:23.100411+00	
00000000-0000-0000-0000-000000000000	bbf82eef-e198-4131-a205-869c262b6e01	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 04:44:23.116358+00	
00000000-0000-0000-0000-000000000000	45f0097b-2bca-4eba-a0bc-c24f9eeed5ee	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 14:07:46.075433+00	
00000000-0000-0000-0000-000000000000	7779496b-c57d-4336-9dfc-5e2cac18a4be	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 14:07:46.103782+00	
00000000-0000-0000-0000-000000000000	5ffaf867-15d9-40d1-b523-c80f5cf5b85e	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-23 14:08:56.790502+00	
00000000-0000-0000-0000-000000000000	9b1d4847-77f0-455d-81ec-5df42f5a9a41	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-23 14:16:05.670368+00	
00000000-0000-0000-0000-000000000000	ad7065ab-ad30-4485-b941-623f085fb1c2	{"action":"logout","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-23 14:30:35.592141+00	
00000000-0000-0000-0000-000000000000	42eda093-e749-4386-b1e8-5879187a74d6	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-23 14:33:36.491161+00	
00000000-0000-0000-0000-000000000000	0b63cd0d-7495-4895-9434-2f49b9f33f72	{"action":"logout","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-23 14:36:42.41415+00	
00000000-0000-0000-0000-000000000000	94be74a3-caf7-4eac-931b-3b44cc9a161f	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-23 14:38:53.676829+00	
00000000-0000-0000-0000-000000000000	e1a5f8f4-f634-4152-b92b-dd8502a87fd4	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 18:26:36.63884+00	
00000000-0000-0000-0000-000000000000	5fdbf80f-04cf-442d-88f0-513004fe3ff1	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 18:26:36.671356+00	
00000000-0000-0000-0000-000000000000	9a6d49e0-bae5-4fe8-b618-1d988e4e4b0e	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 19:24:49.490345+00	
00000000-0000-0000-0000-000000000000	9c2aff55-b29c-47a8-b9d7-cfedf3b3f928	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 19:24:49.502066+00	
00000000-0000-0000-0000-000000000000	63d3ec75-1033-4fef-af66-83d22fa31067	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 20:38:51.699922+00	
00000000-0000-0000-0000-000000000000	15c40720-a5a8-4a45-beea-9cbb37894950	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 20:38:51.71736+00	
00000000-0000-0000-0000-000000000000	46a585d9-26fe-4525-b32a-3448ad877bec	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 21:37:20.491123+00	
00000000-0000-0000-0000-000000000000	e3860c95-c659-4157-8bf5-3f216a0f255e	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 21:37:20.512683+00	
00000000-0000-0000-0000-000000000000	3af1801c-89dd-4870-801b-c26e92cde4c5	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 22:35:49.597155+00	
00000000-0000-0000-0000-000000000000	90d43291-0e7b-4953-bc1b-d1d0179dc855	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 22:35:49.620338+00	
00000000-0000-0000-0000-000000000000	77fc66d0-c6d6-41d4-a4b5-d4eabae5a852	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 23:34:14.485762+00	
00000000-0000-0000-0000-000000000000	3ce8bb4a-675b-43dc-85fa-9293930335c1	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-23 23:34:14.498569+00	
00000000-0000-0000-0000-000000000000	c7afa8ca-a35b-4ca9-9d4d-3cb2bc9af9e0	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 00:52:25.792783+00	
00000000-0000-0000-0000-000000000000	eda2dc27-5412-44c7-a4a9-1837597f8bbd	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 00:52:25.818074+00	
00000000-0000-0000-0000-000000000000	12f5c865-ab1a-41c7-83f2-31f342b56bc2	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 01:50:52.623357+00	
00000000-0000-0000-0000-000000000000	d7c83651-cc48-4e0c-b095-ab428307e9ee	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 01:50:52.640037+00	
00000000-0000-0000-0000-000000000000	4d1d2bd3-bb1f-4561-9dc3-0f91d1a0973c	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 02:49:20.947744+00	
00000000-0000-0000-0000-000000000000	b2ce8ea7-713b-4ec6-92f9-5101a9a0f4c4	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 02:49:20.971408+00	
00000000-0000-0000-0000-000000000000	80396ac6-f02b-4c7d-9063-08931aea5f19	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 13:31:42.898759+00	
00000000-0000-0000-0000-000000000000	1ecba71f-d0ed-4ac2-9a81-a6eecd75b895	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 13:31:42.930149+00	
00000000-0000-0000-0000-000000000000	ed81d111-4fe9-42d6-ae68-488f3efa9fb5	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 18:26:39.992788+00	
00000000-0000-0000-0000-000000000000	a2657f85-bae4-48b7-a798-3840b424eb7b	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 18:26:40.011399+00	
00000000-0000-0000-0000-000000000000	4e02d883-5dfb-4189-98e6-66fa11fc345d	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 19:24:47.201663+00	
00000000-0000-0000-0000-000000000000	73086074-e917-4776-b92e-4518d94c000e	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 19:24:47.218711+00	
00000000-0000-0000-0000-000000000000	ec29c99a-49bb-434b-865e-fa0b9f1d0e14	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 20:23:07.869473+00	
00000000-0000-0000-0000-000000000000	ac00375b-73dd-4526-a7b0-cc41c8399bcb	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 20:23:07.883737+00	
00000000-0000-0000-0000-000000000000	5f4c5271-ee30-4dd5-94c3-a4991d898e35	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 21:21:18.178985+00	
00000000-0000-0000-0000-000000000000	aabfd152-467f-4fd9-b244-c3db0f894680	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 21:21:18.197255+00	
00000000-0000-0000-0000-000000000000	eabb9baa-cc52-48d2-a371-da4fbe654d0c	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 22:19:19.25089+00	
00000000-0000-0000-0000-000000000000	6559fa1e-7b04-451b-8c89-66af61b0d80c	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 22:19:19.264467+00	
00000000-0000-0000-0000-000000000000	99e8f34b-2b47-4b3e-bea0-fe568cb21d87	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 23:17:49.448943+00	
00000000-0000-0000-0000-000000000000	1b4d5cb7-6570-4c48-ab2c-516043957c3f	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-24 23:17:49.466474+00	
00000000-0000-0000-0000-000000000000	8eaba456-7b56-4f2b-af74-c924871d3acd	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 00:17:04.937203+00	
00000000-0000-0000-0000-000000000000	4a544cfc-8950-4c59-a8d1-91aba5b3b32e	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 00:17:04.957715+00	
00000000-0000-0000-0000-000000000000	f49d2879-3bb7-4f21-982b-0d47a6095f40	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 01:15:19.538628+00	
00000000-0000-0000-0000-000000000000	14fb1f26-f2f0-43ca-99d5-53dc7978a01c	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 01:15:19.554386+00	
00000000-0000-0000-0000-000000000000	c6e798b4-febc-43db-a027-f547abad03a2	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 02:13:40.194146+00	
00000000-0000-0000-0000-000000000000	f569a878-e305-43aa-bc0f-6d17e05918b1	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 02:13:40.210722+00	
00000000-0000-0000-0000-000000000000	227f62f1-ccbf-4a81-b756-9ab86279093a	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 03:11:56.747274+00	
00000000-0000-0000-0000-000000000000	1b82e5f5-ca67-4cfd-8bf5-b405389b330f	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 03:11:56.768518+00	
00000000-0000-0000-0000-000000000000	3fa48cad-c095-4389-b4bc-6b11e50aa2b2	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 04:10:21.276538+00	
00000000-0000-0000-0000-000000000000	09af3350-c37d-4c06-be29-21aa28bd992c	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 04:10:21.296596+00	
00000000-0000-0000-0000-000000000000	bb9840d9-01af-4b04-985b-85f4b0bb31d1	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 14:45:33.656057+00	
00000000-0000-0000-0000-000000000000	b8e01e3b-a23a-4e57-b523-89d1ccef4744	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 14:45:33.69215+00	
00000000-0000-0000-0000-000000000000	99b91006-c5b4-4828-a971-5df16028c209	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-25 15:18:55.728534+00	
00000000-0000-0000-0000-000000000000	80352b0f-04c1-487a-a624-ae53cf2b0522	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 15:43:38.194164+00	
00000000-0000-0000-0000-000000000000	3bbc89ad-d586-4ea7-b707-ae7446d47c38	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 15:43:38.212645+00	
00000000-0000-0000-0000-000000000000	db59705e-af31-45de-b873-8c0e0191bb51	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 16:42:08.209691+00	
00000000-0000-0000-0000-000000000000	e5b3bfe0-a7db-480f-bdfe-1f5c2924d65d	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 16:42:08.225802+00	
00000000-0000-0000-0000-000000000000	d8913226-a745-486b-b9d2-09d3d2cd69fe	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 17:40:38.186029+00	
00000000-0000-0000-0000-000000000000	cea847a3-4128-4382-92f9-9bedb0122581	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 17:40:38.20255+00	
00000000-0000-0000-0000-000000000000	7ef69602-e88e-4f1f-9854-0eb9b700c0b6	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 18:39:08.259508+00	
00000000-0000-0000-0000-000000000000	c3fc2f74-7adb-4adf-b329-b49089ad9238	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 18:39:08.276434+00	
00000000-0000-0000-0000-000000000000	21b74d21-c26b-4380-b35f-95d8ef63d11a	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 19:37:38.20887+00	
00000000-0000-0000-0000-000000000000	353c0ae9-dc5e-43ed-ab49-0d50c3183901	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 19:37:38.219829+00	
00000000-0000-0000-0000-000000000000	178f36ae-fb63-4d13-908a-ce314faaf986	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 20:36:08.341247+00	
00000000-0000-0000-0000-000000000000	66b88428-3400-416a-bb65-4af3f93c32c8	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 20:36:08.362514+00	
00000000-0000-0000-0000-000000000000	159a7b9b-e69d-490f-8004-f998b296c10d	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 21:34:42.274054+00	
00000000-0000-0000-0000-000000000000	6124a765-a6ae-4234-bfea-3103faf11734	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 21:34:42.285933+00	
00000000-0000-0000-0000-000000000000	28c5a5b1-5576-40d6-8fa7-5f638d30e226	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 22:33:08.334058+00	
00000000-0000-0000-0000-000000000000	5fc6b993-9fbd-4ee0-95b3-80bf67a2ad78	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 22:33:08.348308+00	
00000000-0000-0000-0000-000000000000	6010ba29-7d25-4255-baf4-e31eafe10bc3	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 23:31:38.480924+00	
00000000-0000-0000-0000-000000000000	fa98e8e6-0654-4d99-9b9f-e6a06ed337e1	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 23:31:38.494668+00	
00000000-0000-0000-0000-000000000000	acb4627c-dada-4390-8e8d-36157ee0817a	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 23:34:45.931195+00	
00000000-0000-0000-0000-000000000000	2386cf7b-38a5-49a8-b9da-7c07e60c16db	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-25 23:34:45.947136+00	
00000000-0000-0000-0000-000000000000	3845decf-aa17-467c-9cde-3c5b2900b6b0	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-26 00:08:41.648497+00	
00000000-0000-0000-0000-000000000000	e9aa1687-1bf5-423a-af99-50a700af841f	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 00:30:07.975499+00	
00000000-0000-0000-0000-000000000000	adf052d1-66f1-43e2-9aed-487aaa793fa7	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 00:30:07.996807+00	
00000000-0000-0000-0000-000000000000	a7346e7d-a50d-4841-8121-098d9425e21d	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-26 00:38:07.770007+00	
00000000-0000-0000-0000-000000000000	fd833e0b-5c17-470a-93f4-9f5a5503babe	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-26 00:38:14.59248+00	
00000000-0000-0000-0000-000000000000	67c35eb5-26ad-4f63-9656-29446f9e1a31	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-26 00:43:03.678304+00	
00000000-0000-0000-0000-000000000000	c4d05c0f-a78e-4e29-b4de-eabcb8f02198	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 01:28:44.500236+00	
00000000-0000-0000-0000-000000000000	13d6927f-b94f-4cdf-a4f7-0d0b35e2f350	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 01:28:44.519297+00	
00000000-0000-0000-0000-000000000000	b32f98be-1b02-4135-902c-82941fd5e13b	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-26 01:45:09.193517+00	
00000000-0000-0000-0000-000000000000	3711fae5-fecc-43f3-83d6-45407924ca1f	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-26 01:45:30.586462+00	
00000000-0000-0000-0000-000000000000	adda15af-7c4e-4d34-8222-812d1d82eff8	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-26 01:49:36.142216+00	
00000000-0000-0000-0000-000000000000	ba38b75e-a902-4655-b14a-7bd938f61afc	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 02:47:40.709716+00	
00000000-0000-0000-0000-000000000000	66d49f48-eb27-4910-8eaa-a160096c753f	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 02:47:40.733455+00	
00000000-0000-0000-0000-000000000000	28dd8938-cb09-47f4-92ca-05655bacd86f	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 02:57:40.795404+00	
00000000-0000-0000-0000-000000000000	d06fdbae-bc98-44e1-a8c5-1f7bde40e9a8	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 02:57:40.803051+00	
00000000-0000-0000-0000-000000000000	4496cc80-0399-496e-9bbf-0376ab417fb8	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 03:46:10.709406+00	
00000000-0000-0000-0000-000000000000	32035dc0-7105-4da0-9365-aceaa153b079	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 03:46:10.724511+00	
00000000-0000-0000-0000-000000000000	946f8dc8-e48b-4901-8905-f3fdb026df0d	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 03:55:46.077938+00	
00000000-0000-0000-0000-000000000000	4f628246-36f8-4675-98be-962de829913b	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 03:55:46.088962+00	
00000000-0000-0000-0000-000000000000	0515a1cc-b1c4-4156-ae13-9ad13dff59a3	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 04:44:26.814501+00	
00000000-0000-0000-0000-000000000000	63cfca5b-2b45-48ab-aeba-888b852aaedf	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 04:44:26.836394+00	
00000000-0000-0000-0000-000000000000	141a0fca-9245-485b-81ec-37f0673863a4	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 05:42:34.383808+00	
00000000-0000-0000-0000-000000000000	f801df31-4160-4f28-a229-573e4fffd054	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 05:42:34.404006+00	
00000000-0000-0000-0000-000000000000	03c9f8cf-1a8b-4fc6-a32b-90bc49d8e10c	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 06:41:11.896513+00	
00000000-0000-0000-0000-000000000000	7e3a429a-5ea8-46d5-89ee-b60c4a5bb3ea	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 06:41:11.909347+00	
00000000-0000-0000-0000-000000000000	c1e747e6-3452-47f1-ba2b-50dd6474c9c3	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 07:39:30.054307+00	
00000000-0000-0000-0000-000000000000	a36da893-1328-4a89-8ab2-80a97a7b9696	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 07:39:30.071078+00	
00000000-0000-0000-0000-000000000000	5497ce08-fa16-4de3-ae26-a355482ee8b3	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 08:37:40.66431+00	
00000000-0000-0000-0000-000000000000	4adf985f-45ce-41fd-aba8-c0c2d0be5878	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 08:37:40.689107+00	
00000000-0000-0000-0000-000000000000	38b62937-2659-4c3a-b1ab-b0b2e2e03ea6	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 15:24:40.165789+00	
00000000-0000-0000-0000-000000000000	e0af55f8-7a16-45eb-9dfe-1c0222bc734d	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 15:24:40.188766+00	
00000000-0000-0000-0000-000000000000	1a1fe31f-65a0-4ebf-88b1-1c57e42bc7cf	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 16:22:53.946869+00	
00000000-0000-0000-0000-000000000000	293156be-cd56-4393-a613-8350c0f97254	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 16:22:53.954753+00	
00000000-0000-0000-0000-000000000000	93346a51-1946-425e-b7e1-33a5603361fb	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 22:10:19.689042+00	
00000000-0000-0000-0000-000000000000	c5e7097a-4040-4974-8d55-bb55cff7335c	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 22:10:19.71761+00	
00000000-0000-0000-0000-000000000000	2caf37ca-8375-4a7b-9614-25d0ef7c1bc8	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 22:10:29.614095+00	
00000000-0000-0000-0000-000000000000	9ba46012-5df9-45fb-bee8-b78d5332cee8	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 23:11:39.957325+00	
00000000-0000-0000-0000-000000000000	aa12391e-29a3-4066-9684-fe7e4853da0e	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 23:11:39.978651+00	
00000000-0000-0000-0000-000000000000	cb586e5f-8924-4c37-a9d9-89b04353f600	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 23:16:39.434776+00	
00000000-0000-0000-0000-000000000000	6a1a225d-f6a7-4804-8496-424358c19dfa	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-26 23:16:39.438715+00	
00000000-0000-0000-0000-000000000000	e8ab56e1-a2a6-4530-9c57-7f199d610174	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 00:09:53.838483+00	
00000000-0000-0000-0000-000000000000	bfa7c91f-1a4d-4f39-9737-73aa336f2764	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 00:09:53.855613+00	
00000000-0000-0000-0000-000000000000	26f42c9a-1dd0-4eb3-ac5a-55b00daaa821	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 01:08:23.613212+00	
00000000-0000-0000-0000-000000000000	c001a983-e867-48b7-b3ef-4ac18402ad9e	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 01:08:23.629883+00	
00000000-0000-0000-0000-000000000000	d5e36f92-e127-4bd1-9046-c7a31f3319a5	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 04:09:14.345055+00	
00000000-0000-0000-0000-000000000000	e4bffd86-171b-4739-986c-bd4a3af26691	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 04:09:14.362977+00	
00000000-0000-0000-0000-000000000000	c1d472f1-7bb0-425e-bf02-01ac8a4346b3	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 05:08:03.36171+00	
00000000-0000-0000-0000-000000000000	d7e0a9c7-3454-4a59-9c2c-ee773ff0b1ae	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 05:08:03.378573+00	
00000000-0000-0000-0000-000000000000	20fa9e2e-c828-4cd3-a297-54ac5b5c919f	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 05:08:03.650938+00	
00000000-0000-0000-0000-000000000000	5bbe862c-f7c6-4ebc-9fb1-6d9c4be378b5	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 06:06:04.989769+00	
00000000-0000-0000-0000-000000000000	8be30a33-00cb-4d19-bb28-51dccf94cab7	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 06:06:05.00929+00	
00000000-0000-0000-0000-000000000000	f6dae754-8202-4720-a5a0-aec5f76c1f0e	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 08:55:53.24436+00	
00000000-0000-0000-0000-000000000000	e0c7c74e-19dc-46c3-a6d7-ab7f4d5bd92d	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 08:55:53.26924+00	
00000000-0000-0000-0000-000000000000	69484c4b-e4e0-4895-a01a-4bdc6942054f	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 12:28:03.018016+00	
00000000-0000-0000-0000-000000000000	785b30c1-ce3e-40df-b6ad-58bf71def48a	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 12:28:03.028442+00	
00000000-0000-0000-0000-000000000000	f53a3f54-5416-46ff-bbc6-d8ba1e73b30a	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 20:00:35.65079+00	
00000000-0000-0000-0000-000000000000	c4427995-001d-4580-b87e-ace0eb5f639a	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 20:00:35.674392+00	
00000000-0000-0000-0000-000000000000	3a99d854-0df9-408f-90f4-f2365ce71f5a	{"action":"logout","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-27 20:13:17.116796+00	
00000000-0000-0000-0000-000000000000	35eca15e-0476-4970-b2bf-c12074cf69f2	{"action":"login","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-27 20:13:26.867032+00	
00000000-0000-0000-0000-000000000000	546d9bc7-a1bc-44a2-9a6c-6173cac02273	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 21:11:29.219747+00	
00000000-0000-0000-0000-000000000000	93c57f2c-85ce-483a-9741-78346b6b7893	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 21:11:29.233439+00	
00000000-0000-0000-0000-000000000000	888f7e6c-4237-4b90-aa62-6a76ae256268	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 22:18:20.611479+00	
00000000-0000-0000-0000-000000000000	a6753533-cb18-4edf-8f79-f736bf2d2873	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 22:18:20.640167+00	
00000000-0000-0000-0000-000000000000	4cf04029-0ccc-43c7-ab7b-7f3095f16ff7	{"action":"token_refreshed","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 23:23:19.471766+00	
00000000-0000-0000-0000-000000000000	959b3146-4844-4e35-8074-6f0436c94eca	{"action":"token_revoked","actor_id":"5ce49d05-0ee6-4f4d-bca2-65de4f0a5958","actor_name":"Mora Avalos","actor_username":"candelacaamano46@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-27 23:23:19.501443+00	
00000000-0000-0000-0000-000000000000	40f71a60-437f-4040-a832-81596e31898d	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-27 23:35:57.090552+00	
00000000-0000-0000-0000-000000000000	27fd4e3b-e496-4cf3-a87f-2bdaf5ceb127	{"action":"user_signedup","actor_id":"c61a0f6c-6542-4476-a603-c641f86f23b8","actor_name":"mora melina avalos","actor_username":"moramelina01@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2025-10-27 23:37:16.204458+00	
00000000-0000-0000-0000-000000000000	49841482-df9f-421c-ae0b-e14a52c37143	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-27 23:38:10.815216+00	
00000000-0000-0000-0000-000000000000	131861fa-73e8-47d3-a0a9-efe89bf6fe97	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 00:26:29.709114+00	
00000000-0000-0000-0000-000000000000	75884449-ffc7-4679-a621-065430f786ca	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 00:26:29.73113+00	
00000000-0000-0000-0000-000000000000	4e065c00-dfd7-450b-83b2-16378a661676	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 03:12:17.17935+00	
00000000-0000-0000-0000-000000000000	d9e7b3b1-9b46-40cc-8add-364ee5f26694	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 03:12:17.204759+00	
00000000-0000-0000-0000-000000000000	8658d5aa-e8db-407f-9739-855dae6e0333	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 04:10:41.472212+00	
00000000-0000-0000-0000-000000000000	a98cc469-3bd6-4d5b-a274-cb00068b2c88	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 04:10:41.49099+00	
00000000-0000-0000-0000-000000000000	a6127fbf-dc81-4c92-8011-fabd5e77704a	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 05:09:26.261039+00	
00000000-0000-0000-0000-000000000000	b5078024-5c5f-44b5-a777-7b4261554fdd	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 05:09:26.292731+00	
00000000-0000-0000-0000-000000000000	135af96e-cf01-4240-a4a1-efdbea74a144	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 06:30:25.820801+00	
00000000-0000-0000-0000-000000000000	c4a2f440-14b8-4080-8198-04a04de34bed	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 06:30:25.839585+00	
00000000-0000-0000-0000-000000000000	f56e1f75-2c4a-4e2e-9867-314c012ee1d3	{"action":"login","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-28 07:43:28.774337+00	
00000000-0000-0000-0000-000000000000	f75dcefc-6170-45de-a447-f269dc790c3b	{"action":"token_refreshed","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 07:52:33.067099+00	
00000000-0000-0000-0000-000000000000	9c1d86b5-ec49-4cbe-ba3a-078974c7aae6	{"action":"token_revoked","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 07:52:33.068397+00	
00000000-0000-0000-0000-000000000000	e9ab4dd7-34a2-4a91-a386-51f30b135495	{"action":"logout","actor_id":"c4efd970-b52b-4db8-8fb4-fa293fcc9517","actor_name":"Pedro Osnaghi","actor_username":"osnaghi.prog@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-28 07:53:13.25472+00	
00000000-0000-0000-0000-000000000000	29a21be6-8507-471f-a563-2b0d6f97b2db	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-28 14:39:27.449376+00	
00000000-0000-0000-0000-000000000000	731f2c02-1255-4c0d-a4c0-5cae85daad21	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-28 14:50:12.322019+00	
00000000-0000-0000-0000-000000000000	d083e4ef-4904-4656-8629-5ed36bf830fc	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2025-10-28 14:59:54.23896+00	
00000000-0000-0000-0000-000000000000	b6b55cba-e380-4fbf-bcd2-2ee96b54d6f3	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-28 15:07:01.07109+00	
00000000-0000-0000-0000-000000000000	a1327e53-b0f6-4da3-b6cf-7eb897abede5	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-28 15:07:09.579829+00	
00000000-0000-0000-0000-000000000000	059a09be-3553-49a8-818f-a2e81d67dfdb	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 16:08:33.634317+00	
00000000-0000-0000-0000-000000000000	2ba2c602-3fe0-4af4-80d8-513f0c2f2238	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 16:08:33.66702+00	
00000000-0000-0000-0000-000000000000	13ac5467-cc67-42f0-8844-aa93b0779620	{"action":"logout","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-10-28 16:08:34.031959+00	
00000000-0000-0000-0000-000000000000	8d0c03c4-fa49-4de1-aed7-59b322d57a8e	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-28 16:08:38.938661+00	
00000000-0000-0000-0000-000000000000	1efeb5e7-9f9e-4621-abc6-d02002d3cb4d	{"action":"token_refreshed","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 17:30:56.014275+00	
00000000-0000-0000-0000-000000000000	3e8e05e4-2025-49ad-9bfc-b2bf4a3e3c4d	{"action":"token_revoked","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-10-28 17:30:56.030094+00	
00000000-0000-0000-0000-000000000000	d8f98a56-23f1-4e4c-b5ad-1348f4754b4b	{"action":"login","actor_id":"745fdf89-2751-41ee-8554-778ee29f98ae","actor_name":"Martín Mutuverría","actor_username":"mutuverria00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-10-28 18:17:26.333105+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
c798fd85-d384-4162-9919-f57b21c40ea1	c798fd85-d384-4162-9919-f57b21c40ea1	{"sub": "c798fd85-d384-4162-9919-f57b21c40ea1", "email": "moavalos01@outlook.com.ar", "email_verified": true, "phone_verified": false}	email	2025-09-27 23:20:45.158834+00	2025-09-27 23:20:45.158892+00	2025-09-27 23:20:45.158892+00	3d3076df-19fe-417e-8b51-29d4c2cbedf0
9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	{"sub": "9703ff1a-b3f6-429d-9ec4-c93e4e2f791c", "email": "pedro-le2003@hotmail.com", "full_name": "pedro123", "email_verified": true, "phone_verified": false}	email	2025-10-11 06:18:45.922582+00	2025-10-11 06:18:45.92323+00	2025-10-11 06:18:45.92323+00	b3fe56e5-6b09-4c6d-8138-50da5f5c18a3
745fdf89-2751-41ee-8554-778ee29f98ae	745fdf89-2751-41ee-8554-778ee29f98ae	{"sub": "745fdf89-2751-41ee-8554-778ee29f98ae", "email": "mutuverria00@gmail.com", "full_name": "Martín", "email_verified": true, "phone_verified": false}	email	2025-10-12 18:24:33.613649+00	2025-10-12 18:24:33.614323+00	2025-10-12 18:24:33.614323+00	57f45a9f-f675-430a-b656-2d378488eb49
101834365633649492835	798a0644-deb5-4abd-8593-3829b4a9a8df	{"iss": "https://accounts.google.com", "sub": "101834365633649492835", "name": "Pedro Ricartes", "email": "su.campos.211@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJKDy0l5rKmiihseiYCws4fNx7Lb7n94gTBY_f5AX-GQHcqwPKe6A=s96-c", "full_name": "Pedro Ricartes", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJKDy0l5rKmiihseiYCws4fNx7Lb7n94gTBY_f5AX-GQHcqwPKe6A=s96-c", "provider_id": "101834365633649492835", "email_verified": true, "phone_verified": false}	google	2025-10-13 20:10:36.430536+00	2025-10-13 20:10:36.4306+00	2025-10-13 20:10:36.4306+00	ccc95e88-680c-4eb8-93ac-e4680ad96ec9
103915676854587711018	2d57c1c8-b94d-4df9-a3c4-0d6cbdcc0965	{"iss": "https://accounts.google.com", "sub": "103915676854587711018", "name": "ricartes123", "email": "pedro.ricartes123@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKZoRtslT0gtJV3QVYZ0ZGhsAn2fuWK_84ViNP59NWTUzaySuei=s96-c", "full_name": "ricartes123", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKZoRtslT0gtJV3QVYZ0ZGhsAn2fuWK_84ViNP59NWTUzaySuei=s96-c", "provider_id": "103915676854587711018", "email_verified": true, "phone_verified": false}	google	2025-10-11 06:17:57.240908+00	2025-10-11 06:17:57.240966+00	2025-10-11 06:17:57.240966+00	00d5ae68-5f13-4243-b37e-3f4958a3df26
101307195162942680189	c4efd970-b52b-4db8-8fb4-fa293fcc9517	{"iss": "https://accounts.google.com", "sub": "101307195162942680189", "name": "Pedro Osnaghi", "email": "osnaghi.prog@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJu6ddF-CsiGB7BAAoZiJeyWGeTe0wf4FkifyC9lEziI0WZ0mDR9w=s96-c", "full_name": "Pedro Osnaghi", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJu6ddF-CsiGB7BAAoZiJeyWGeTe0wf4FkifyC9lEziI0WZ0mDR9w=s96-c", "provider_id": "101307195162942680189", "email_verified": true, "phone_verified": false}	google	2025-10-15 21:05:02.591992+00	2025-10-15 21:05:02.592047+00	2025-10-28 07:43:28.740736+00	d7d3d3dd-9103-433c-a4bc-b4615cb7cd87
c4efd970-b52b-4db8-8fb4-fa293fcc9517	c4efd970-b52b-4db8-8fb4-fa293fcc9517	{"sub": "c4efd970-b52b-4db8-8fb4-fa293fcc9517", "email": "osnaghi.prog@gmail.com", "full_name": "Pedro_osnaghi", "email_verified": true, "phone_verified": false}	email	2025-10-14 21:47:23.407824+00	2025-10-14 21:47:23.40788+00	2025-10-14 21:47:23.40788+00	c6498af3-793c-412f-8aad-7cf1de8d1d9b
100041847830285396327	5ce49d05-0ee6-4f4d-bca2-65de4f0a5958	{"iss": "https://accounts.google.com", "sub": "100041847830285396327", "name": "Mora Avalos", "email": "candelacaamano46@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJASkPM45x9-6yi3DdnuXDOEgxf5vZ2rbQTPdnX3T_rdz-zdGPt=s96-c", "full_name": "Mora Avalos", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJASkPM45x9-6yi3DdnuXDOEgxf5vZ2rbQTPdnX3T_rdz-zdGPt=s96-c", "provider_id": "100041847830285396327", "email_verified": true, "phone_verified": false}	google	2025-10-12 20:22:11.657509+00	2025-10-12 20:22:11.657564+00	2025-10-27 20:13:26.846521+00	36a0cd83-0037-4f38-aaee-f55a9f635cc5
105507653626525843789	c61a0f6c-6542-4476-a603-c641f86f23b8	{"iss": "https://accounts.google.com", "sub": "105507653626525843789", "name": "mora melina avalos", "email": "moramelina01@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKbIrmUs83feNXTFUp_0fO8F20Bfr4umPEYnhpP7hhOYcd4sQ=s96-c", "full_name": "mora melina avalos", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKbIrmUs83feNXTFUp_0fO8F20Bfr4umPEYnhpP7hhOYcd4sQ=s96-c", "provider_id": "105507653626525843789", "email_verified": true, "phone_verified": false}	google	2025-10-27 23:37:16.194307+00	2025-10-27 23:37:16.194978+00	2025-10-27 23:37:16.194978+00	f555067e-4f96-486e-920e-b98cf970c93a
100970818586524481402	745fdf89-2751-41ee-8554-778ee29f98ae	{"iss": "https://accounts.google.com", "sub": "100970818586524481402", "name": "Martín Mutuverría", "email": "mutuverria00@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocLE1toVsBi7n77XZhvcLt_FBplgxwvVmMXHvCL4HSqzi5OZecg=s96-c", "full_name": "Martín Mutuverría", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocLE1toVsBi7n77XZhvcLt_FBplgxwvVmMXHvCL4HSqzi5OZecg=s96-c", "provider_id": "100970818586524481402", "email_verified": true, "phone_verified": false}	google	2025-10-15 18:14:46.100315+00	2025-10-15 18:14:46.100377+00	2025-10-28 14:59:54.225614+00	f936ae58-f7e1-4e02-9571-33e37f80c67a
117297104586198808427	2317247e-c013-4f13-b676-cd40a75f9aa8	{"iss": "https://accounts.google.com", "sub": "117297104586198808427", "name": "Pedro Osnaghi", "email": "osnaghi.developer@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJKp01BschZtyzszmvQsfcmy05OjIEH2QUYf0tMrRPvWMV6ypI=s96-c", "full_name": "Pedro Osnaghi", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJKp01BschZtyzszmvQsfcmy05OjIEH2QUYf0tMrRPvWMV6ypI=s96-c", "provider_id": "117297104586198808427", "email_verified": true, "phone_verified": false}	google	2025-10-19 04:41:58.729936+00	2025-10-19 04:41:58.729985+00	2025-10-19 04:41:58.729985+00	b016b0a8-cbf9-44d3-81af-b3b0cf050f25
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
6131ea69-f942-4cea-abb7-44e705ea2693	2025-10-27 20:13:26.904775+00	2025-10-27 20:13:26.904775+00	oauth	c496f32b-124d-42a6-9673-5c19c881bfeb
fe589fb3-703e-4a39-8285-f7326adcf024	2025-10-27 23:37:16.223024+00	2025-10-27 23:37:16.223024+00	oauth	4d2b589b-1087-44ea-a118-7bc5a7ed4ba1
2605c4c9-1778-49fb-8591-c9c3cfc16891	2025-10-28 16:08:38.956873+00	2025-10-28 16:08:38.956873+00	password	f0b4a034-e9d9-4616-8398-23e8190d52e4
562d4eff-994d-4b70-8ed2-59281ec62c94	2025-10-28 18:17:26.394896+00	2025-10-28 18:17:26.394896+00	password	8bec411f-8a44-48d7-aa8b-9f3b597656b9
ed7b583b-0504-4b10-87d7-1f2afac039ca	2025-09-27 23:20:53.072623+00	2025-09-27 23:20:53.072623+00	otp	49731a15-efed-4a97-a9f1-6a39b41e7020
9736d6e1-b1bf-4f6a-9faa-d4ac99fa0d9e	2025-09-27 23:22:14.883061+00	2025-09-27 23:22:14.883061+00	otp	55aaf665-b821-4fe6-be86-aefa96eb9357
0de97ec0-9d77-44a7-81c8-06930199f810	2025-09-27 23:24:18.94773+00	2025-09-27 23:24:18.94773+00	otp	144d268d-cce4-4003-9085-c9eac3f0873b
515312a1-3d7c-4121-a1d1-706ab3321b0c	2025-09-27 23:26:07.031904+00	2025-09-27 23:26:07.031904+00	otp	901770b7-4ee7-4ec9-89e8-7dff5840031a
699031c1-b24b-4d15-9f4f-c3b590922d8c	2025-09-28 15:12:48.123383+00	2025-09-28 15:12:48.123383+00	otp	0525b786-4206-4c89-a37d-6dcf49504687
32e7e366-9b42-4e80-92e1-a58fd1e9c14b	2025-10-19 04:41:58.768098+00	2025-10-19 04:41:58.768098+00	oauth	922bbfc5-ba82-4ecb-bc30-69ed51eb4eee
94afe1f1-ab94-486f-962b-66ccf76434ac	2025-10-11 06:17:57.308087+00	2025-10-11 06:17:57.308087+00	oauth	fb31a05d-ea72-4019-a00c-f3f4eb588e0f
5d634679-4f64-4791-8071-abae384432d2	2025-10-11 06:19:09.407366+00	2025-10-11 06:19:09.407366+00	otp	f33c4f2c-f790-4502-a072-9e17188040f9
ec18d170-54e5-4ded-be83-e4312d0f6820	2025-10-11 06:19:15.299468+00	2025-10-11 06:19:15.299468+00	password	67b131c4-7576-467f-823a-3e7f6631e7aa
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	266	q55hcjdfqxj6	2317247e-c013-4f13-b676-cd40a75f9aa8	f	2025-10-20 15:24:26.373895+00	2025-10-20 15:24:26.373895+00	zzrz6dqbnb3i	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	422	aimmbovgglkh	745fdf89-2751-41ee-8554-778ee29f98ae	f	2025-10-28 18:17:26.373+00	2025-10-28 18:17:26.373+00	\N	562d4eff-994d-4b70-8ed2-59281ec62c94
00000000-0000-0000-0000-000000000000	78	uejhha2pqggt	9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	t	2025-10-12 15:23:08.446871+00	2025-10-13 19:59:48.528349+00	6tnddikpby5k	ec18d170-54e5-4ded-be83-e4312d0f6820
00000000-0000-0000-0000-000000000000	119	2cr45antqy4l	9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	f	2025-10-13 19:59:48.530458+00	2025-10-13 19:59:48.530458+00	uejhha2pqggt	ec18d170-54e5-4ded-be83-e4312d0f6820
00000000-0000-0000-0000-000000000000	402	ljkixefwv4pk	5ce49d05-0ee6-4f4d-bca2-65de4f0a5958	t	2025-10-27 21:11:29.245419+00	2025-10-27 22:18:20.640895+00	lf3zt3aurzdv	6131ea69-f942-4cea-abb7-44e705ea2693
00000000-0000-0000-0000-000000000000	53	6tnddikpby5k	9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	t	2025-10-11 06:19:15.29757+00	2025-10-12 15:23:08.444136+00	\N	ec18d170-54e5-4ded-be83-e4312d0f6820
00000000-0000-0000-0000-000000000000	23	utfpetkyissw	c798fd85-d384-4162-9919-f57b21c40ea1	f	2025-09-27 23:20:53.063799+00	2025-09-27 23:20:53.063799+00	\N	ed7b583b-0504-4b10-87d7-1f2afac039ca
00000000-0000-0000-0000-000000000000	24	5kc4vprvb5uf	c798fd85-d384-4162-9919-f57b21c40ea1	f	2025-09-27 23:22:14.86435+00	2025-09-27 23:22:14.86435+00	\N	9736d6e1-b1bf-4f6a-9faa-d4ac99fa0d9e
00000000-0000-0000-0000-000000000000	25	2tm45l4hdreg	c798fd85-d384-4162-9919-f57b21c40ea1	f	2025-09-27 23:24:18.938811+00	2025-09-27 23:24:18.938811+00	\N	0de97ec0-9d77-44a7-81c8-06930199f810
00000000-0000-0000-0000-000000000000	26	sqdc7j6ulzb7	c798fd85-d384-4162-9919-f57b21c40ea1	f	2025-09-27 23:26:07.030028+00	2025-09-27 23:26:07.030028+00	\N	515312a1-3d7c-4121-a1d1-706ab3321b0c
00000000-0000-0000-0000-000000000000	27	7lrx7lva7bcg	c798fd85-d384-4162-9919-f57b21c40ea1	f	2025-09-28 15:12:48.108055+00	2025-09-28 15:12:48.108055+00	\N	699031c1-b24b-4d15-9f4f-c3b590922d8c
00000000-0000-0000-0000-000000000000	51	p2hag4h44xdn	2d57c1c8-b94d-4df9-a3c4-0d6cbdcc0965	f	2025-10-11 06:17:57.286371+00	2025-10-11 06:17:57.286371+00	\N	94afe1f1-ab94-486f-962b-66ccf76434ac
00000000-0000-0000-0000-000000000000	52	53qj2nau3j4g	9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	f	2025-10-11 06:19:09.406114+00	2025-10-11 06:19:09.406114+00	\N	5d634679-4f64-4791-8071-abae384432d2
00000000-0000-0000-0000-000000000000	265	zzrz6dqbnb3i	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 14:14:30.404897+00	2025-10-20 15:24:26.351231+00	rfkl35lixce3	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	420	nwxgstswozyd	745fdf89-2751-41ee-8554-778ee29f98ae	t	2025-10-28 16:08:38.954978+00	2025-10-28 17:30:56.033214+00	\N	2605c4c9-1778-49fb-8591-c9c3cfc16891
00000000-0000-0000-0000-000000000000	241	ikhaehlqijxw	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 04:41:58.762814+00	2025-10-19 05:40:07.302762+00	\N	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	242	uwesmf3cnrwc	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 05:40:07.324287+00	2025-10-19 06:38:23.582928+00	ikhaehlqijxw	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	243	hku3m3r5lsq2	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 06:38:23.590984+00	2025-10-19 07:46:23.008866+00	uwesmf3cnrwc	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	244	i5aybgnui7lm	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 07:46:23.021328+00	2025-10-19 08:44:25.012661+00	hku3m3r5lsq2	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	245	u23dl3brokbs	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 08:44:25.026932+00	2025-10-19 09:48:08.378942+00	i5aybgnui7lm	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	246	r5fvapw6v4kj	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 09:48:08.403247+00	2025-10-19 10:46:37.236674+00	u23dl3brokbs	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	403	le7vqi2vhveo	5ce49d05-0ee6-4f4d-bca2-65de4f0a5958	t	2025-10-27 22:18:20.667008+00	2025-10-27 23:23:19.504587+00	ljkixefwv4pk	6131ea69-f942-4cea-abb7-44e705ea2693
00000000-0000-0000-0000-000000000000	247	lweoz6vxvxdj	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 10:46:37.249134+00	2025-10-19 11:44:56.796428+00	r5fvapw6v4kj	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	406	3wfxb6djvicu	c61a0f6c-6542-4476-a603-c641f86f23b8	f	2025-10-27 23:37:16.216724+00	2025-10-27 23:37:16.216724+00	\N	fe589fb3-703e-4a39-8285-f7326adcf024
00000000-0000-0000-0000-000000000000	248	bvios7kvdulj	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 11:44:56.803442+00	2025-10-19 18:44:38.810583+00	lweoz6vxvxdj	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	249	w3nzbx4ag5jy	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 18:44:38.836238+00	2025-10-19 19:42:59.018522+00	bvios7kvdulj	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	250	mecw2ey4lwrt	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 19:42:59.028347+00	2025-10-19 20:41:03.699833+00	w3nzbx4ag5jy	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	251	xeznixqxbfbx	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 20:41:03.711047+00	2025-10-19 21:39:14.769097+00	mecw2ey4lwrt	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	252	7fgtwez4ba37	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 21:39:14.786397+00	2025-10-19 22:37:38.967231+00	xeznixqxbfbx	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	253	5vnyeipuz4j2	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-19 22:37:38.980992+00	2025-10-20 02:26:16.240483+00	7fgtwez4ba37	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	254	45uou2t2anms	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 02:26:16.25244+00	2025-10-20 03:47:49.144193+00	5vnyeipuz4j2	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	255	f3scfu6l6cdb	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 03:47:49.155196+00	2025-10-20 04:45:57.939091+00	45uou2t2anms	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	256	lapaqsj66kkc	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 04:45:57.949309+00	2025-10-20 05:44:33.000962+00	f3scfu6l6cdb	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	257	u4x2dizkmx6e	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 05:44:33.011617+00	2025-10-20 07:23:14.572456+00	lapaqsj66kkc	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	258	kolbvtbh456g	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 07:23:14.585954+00	2025-10-20 08:22:09.572914+00	u4x2dizkmx6e	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	259	wamqsq77cgp5	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 08:22:09.585494+00	2025-10-20 09:20:53.119644+00	kolbvtbh456g	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	260	ppkhqab2yngp	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 09:20:53.130671+00	2025-10-20 10:19:27.515375+00	wamqsq77cgp5	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	261	yw27rzbmgodp	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 10:19:27.535725+00	2025-10-20 11:19:33.896054+00	ppkhqab2yngp	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	262	w23mffee2qoc	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 11:19:33.90607+00	2025-10-20 12:18:06.848453+00	yw27rzbmgodp	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	263	ajj7mqxvq6ig	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 12:18:06.857228+00	2025-10-20 13:16:12.953099+00	w23mffee2qoc	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	264	rfkl35lixce3	2317247e-c013-4f13-b676-cd40a75f9aa8	t	2025-10-20 13:16:12.965922+00	2025-10-20 14:14:30.39405+00	ajj7mqxvq6ig	32e7e366-9b42-4e80-92e1-a58fd1e9c14b
00000000-0000-0000-0000-000000000000	421	6ewfn327hlae	745fdf89-2751-41ee-8554-778ee29f98ae	f	2025-10-28 17:30:56.04146+00	2025-10-28 17:30:56.04146+00	nwxgstswozyd	2605c4c9-1778-49fb-8591-c9c3cfc16891
00000000-0000-0000-0000-000000000000	401	lf3zt3aurzdv	5ce49d05-0ee6-4f4d-bca2-65de4f0a5958	t	2025-10-27 20:13:26.89183+00	2025-10-27 21:11:29.235366+00	\N	6131ea69-f942-4cea-abb7-44e705ea2693
00000000-0000-0000-0000-000000000000	404	qwfsgok233ny	5ce49d05-0ee6-4f4d-bca2-65de4f0a5958	f	2025-10-27 23:23:19.52841+00	2025-10-27 23:23:19.52841+00	le7vqi2vhveo	6131ea69-f942-4cea-abb7-44e705ea2693
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id) FROM stdin;
562d4eff-994d-4b70-8ed2-59281ec62c94	745fdf89-2751-41ee-8554-778ee29f98ae	2025-10-28 18:17:26.354372+00	2025-10-28 18:17:26.354372+00	\N	aal1	\N	\N	node	190.175.97.147	\N	\N
6131ea69-f942-4cea-abb7-44e705ea2693	5ce49d05-0ee6-4f4d-bca2-65de4f0a5958	2025-10-27 20:13:26.870915+00	2025-10-27 23:23:19.5527+00	\N	aal1	\N	2025-10-27 23:23:19.551409	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36	181.91.175.195	\N	\N
fe589fb3-703e-4a39-8285-f7326adcf024	c61a0f6c-6542-4476-a603-c641f86f23b8	2025-10-27 23:37:16.213659+00	2025-10-27 23:37:16.213659+00	\N	aal1	\N	\N	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36	181.91.175.195	\N	\N
ed7b583b-0504-4b10-87d7-1f2afac039ca	c798fd85-d384-4162-9919-f57b21c40ea1	2025-09-27 23:20:53.057762+00	2025-09-27 23:20:53.057762+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36	181.91.175.195	\N	\N
9736d6e1-b1bf-4f6a-9faa-d4ac99fa0d9e	c798fd85-d384-4162-9919-f57b21c40ea1	2025-09-27 23:22:14.852056+00	2025-09-27 23:22:14.852056+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36	181.91.175.195	\N	\N
0de97ec0-9d77-44a7-81c8-06930199f810	c798fd85-d384-4162-9919-f57b21c40ea1	2025-09-27 23:24:18.932643+00	2025-09-27 23:24:18.932643+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36	181.91.175.195	\N	\N
515312a1-3d7c-4121-a1d1-706ab3321b0c	c798fd85-d384-4162-9919-f57b21c40ea1	2025-09-27 23:26:07.028722+00	2025-09-27 23:26:07.028722+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36	181.91.175.195	\N	\N
699031c1-b24b-4d15-9f4f-c3b590922d8c	c798fd85-d384-4162-9919-f57b21c40ea1	2025-09-28 15:12:48.098544+00	2025-09-28 15:12:48.098544+00	\N	aal1	\N	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36	181.91.175.195	\N	\N
94afe1f1-ab94-486f-962b-66ccf76434ac	2d57c1c8-b94d-4df9-a3c4-0d6cbdcc0965	2025-10-11 06:17:57.276757+00	2025-10-11 06:17:57.276757+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0	190.175.100.71	\N	\N
5d634679-4f64-4791-8071-abae384432d2	9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	2025-10-11 06:19:09.404497+00	2025-10-11 06:19:09.404497+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0	190.175.100.71	\N	\N
32e7e366-9b42-4e80-92e1-a58fd1e9c14b	2317247e-c013-4f13-b676-cd40a75f9aa8	2025-10-19 04:41:58.749226+00	2025-10-20 15:24:26.403404+00	\N	aal1	\N	2025-10-20 15:24:26.403311	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	186.22.225.36	\N	\N
ec18d170-54e5-4ded-be83-e4312d0f6820	9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	2025-10-11 06:19:15.296728+00	2025-10-13 19:59:48.54514+00	\N	aal1	\N	2025-10-13 19:59:48.543869	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0	190.175.100.71	\N	\N
2605c4c9-1778-49fb-8591-c9c3cfc16891	745fdf89-2751-41ee-8554-778ee29f98ae	2025-10-28 16:08:38.941352+00	2025-10-28 17:30:56.059361+00	\N	aal1	\N	2025-10-28 17:30:56.059253	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36	190.175.97.147	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	798a0644-deb5-4abd-8593-3829b4a9a8df	authenticated	authenticated	su.campos.211@gmail.com	\N	2025-10-13 20:10:36.451417+00	\N		\N		\N			\N	2025-10-13 20:10:36.460535+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "101834365633649492835", "name": "Pedro Ricartes", "email": "su.campos.211@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJKDy0l5rKmiihseiYCws4fNx7Lb7n94gTBY_f5AX-GQHcqwPKe6A=s96-c", "full_name": "Pedro Ricartes", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJKDy0l5rKmiihseiYCws4fNx7Lb7n94gTBY_f5AX-GQHcqwPKe6A=s96-c", "provider_id": "101834365633649492835", "email_verified": true, "phone_verified": false}	\N	2025-10-13 20:10:36.396302+00	2025-10-13 20:10:36.487777+00	\N	\N			\N		0	\N		\N	f	\Nf
00000000-0000-0000-0000-000000000000	2317247e-c013-4f13-b676-cd40a75f9aa8	authenticated	authenticated	osnaghi.developer@gmail.com	\N	2025-10-19 04:41:58.742533+00	\N		\N		\N			\N2025-10-19 04:41:58.749133+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "117297104586198808427", "name": "Pedro Osnaghi", "email": "osnaghi.developer@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJKp01BschZtyzszmvQsfcmy05OjIEH2QUYf0tMrRPvWMV6ypI=s96-c", "full_name": "Pedro Osnaghi", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJKp01BschZtyzszmvQsfcmy05OjIEH2QUYf0tMrRPvWMV6ypI=s96-c", "provider_id": "117297104586198808427", "email_verified": true, "phone_verified": false}	\N	2025-10-19 04:41:58.682341+00	2025-10-20 15:24:26.390323+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	745fdf89-2751-41ee-8554-778ee29f98ae	authenticated	authenticated	mutuverria00@gmail.com	$2a$10$3IoX7rz7BYeTFy.FZOVM2eUfAfidl1JqP3OpvLwzM.s7pmK2lyTlq	2025-10-12 18:24:43.649112+00	\N		025-10-12 18:24:33.62967+00		\N			\N	2025-10-28 18:17:26.35427+00	{"provider": "email", "providers": ["email", "google"]}	{"iss": "https://accounts.google.com", "sub": "100970818586524481402", "name": "Martín Mutuverría", "email": "mutuverria00@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocLE1toVsBi7n77XZhvcLt_FBplgxwvVmMXHvCL4HSqzi5OZecg=s96-c", "full_name": "Martín Mutuverría", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocLE1toVsBi7n77XZhvcLt_FBplgxwvVmMXHvCL4HSqzi5OZecg=s96-c", "provider_id": "100970818586524481402", "email_verified": true, "phone_verified": false}	\N	2025-10-12 18:24:33.594378+00	2025-10-28 18:17:26.388873+00	\N	\N\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c798fd85-d384-4162-9919-f57b21c40ea1	authenticated	authenticated	moavalos01@outlook.com.ar	$2a$10$A/YLwk/douzajUsjTrD71O6krdoizj7ld4tDaj0GTnJ04dR3vIoSC	2025-09-27 23:20:53.042205+00	2025-09-27 23:20:45.184319+00		\N		2025-09-28 15:12:34.755661+00			\N	2025-09-28 15:12:48.097795+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-09-27 23:20:45.123926+00	2025-09-28 15:12:48.122864+00	\N	\N			\N		0	\N		\Nf\N	f
00000000-0000-0000-0000-000000000000	9703ff1a-b3f6-429d-9ec4-c93e4e2f791c	authenticated	authenticated	pedro-le2003@hotmail.com	$2a$10$PBh2O8bwg0ZMn8eZ2M/VK.jBo5TN7YwpwjWCskFDuqkCPoTqsl9yy	2025-10-11 06:19:09.400058+00	\N		025-10-11 06:18:45.926925+00		\N			\N	2025-10-11 06:19:15.296649+00	{"provider": "email", "providers": ["email"]}	{"sub": "9703ff1a-b3f6-429d-9ec4-c93e4e2f791c", "email": "pedro-le2003@hotmail.com", "full_name": "pedro123", "email_verified": true, "phone_verified": false}	\N	2025-10-11 06:18:45.91869+00	2025-10-13 19:59:48.540272+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	2d57c1c8-b94d-4df9-a3c4-0d6cbdcc0965	authenticated	authenticated	pedro.ricartes123@gmail.com	\N	2025-10-11 06:17:57.269671+00	\N		\N		\N			\N2025-10-11 06:17:57.276675+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "103915676854587711018", "name": "ricartes123", "email": "pedro.ricartes123@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKZoRtslT0gtJV3QVYZ0ZGhsAn2fuWK_84ViNP59NWTUzaySuei=s96-c", "full_name": "ricartes123", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKZoRtslT0gtJV3QVYZ0ZGhsAn2fuWK_84ViNP59NWTUzaySuei=s96-c", "provider_id": "103915676854587711018", "email_verified": true, "phone_verified": false}	\N	2025-10-11 06:17:57.204657+00	2025-10-11 06:17:57.306941+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c4efd970-b52b-4db8-8fb4-fa293fcc9517	authenticated	authenticated	osnaghi.prog@gmail.com	$2a$10$IjNLfgS8FhJ7frK0.hPL7.GWgwp57J7ACgqclHBNS24WV1UJqj/ki	2025-10-14 21:47:45.677165+00	\N		025-10-14 21:47:23.424413+00		\N			\N	2025-10-28 07:43:28.794671+00	{"provider": "google", "providers": ["google", "email"]}	{"iss": "https://accounts.google.com", "sub": "101307195162942680189", "name": "Pedro Osnaghi", "email": "osnaghi.prog@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJu6ddF-CsiGB7BAAoZiJeyWGeTe0wf4FkifyC9lEziI0WZ0mDR9w=s96-c", "full_name": "Pedro Osnaghi", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJu6ddF-CsiGB7BAAoZiJeyWGeTe0wf4FkifyC9lEziI0WZ0mDR9w=s96-c", "provider_id": "101307195162942680189", "email_verified": true, "phone_verified": false}	\N	2025-10-14 21:47:23.38662+00	2025-10-28 07:52:33.076249+00	\N	\N		N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	5ce49d05-0ee6-4f4d-bca2-65de4f0a5958	authenticated	authenticated	candelacaamano46@gmail.com	\N	2025-10-12 20:22:11.671846+00	\N		\N		\N			\N	2025-10-27 20:13:26.870813+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "100041847830285396327", "name": "Mora Avalos", "email": "candelacaamano46@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJASkPM45x9-6yi3DdnuXDOEgxf5vZ2rbQTPdnX3T_rdz-zdGPt=s96-c", "full_name": "Mora Avalos", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJASkPM45x9-6yi3DdnuXDOEgxf5vZ2rbQTPdnX3T_rdz-zdGPt=s96-c", "provider_id": "100041847830285396327", "email_verified": true, "phone_verified": false}	\N	2025-10-12 20:22:11.603717+00	2025-10-27 23:23:19.540263+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c61a0f6c-6542-4476-a603-c641f86f23b8	authenticated	authenticated	moramelina01@gmail.com	\N	2025-10-27 23:37:16.207997+00	\N		\N		\N			\N	2025-10-27 23:37:16.213564+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "105507653626525843789", "name": "mora melina avalos", "email": "moramelina01@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKbIrmUs83feNXTFUp_0fO8F20Bfr4umPEYnhpP7hhOYcd4sQ=s96-c", "full_name": "mora melina avalos", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKbIrmUs83feNXTFUp_0fO8F20Bfr4umPEYnhpP7hhOYcd4sQ=s96-c", "provider_id": "105507653626525843789", "email_verified": true, "phone_verified": false}	\N	2025-10-27 23:37:16.158102+00	2025-10-27 23:37:16.221243+00	\N	\N			\N		0	\N		\N	f	\Nf
\.


--
-- Data for Name: badge; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.badge (id, badge_image, badge_description) FROM stdin;
\.


--
-- Data for Name: badge_tier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.badge_tier (badge_id, tier_id) FROM stdin;
\.


--
-- Data for Name: dream_emotion_context; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dream_emotion_context (dream_id, emotion_context_id) FROM stdin;
2f84c5e7-0aeb-4b6f-994a-fc3569a5503a	a42a2012-0689-405d-857d-b9872f2e6c4f
2f84c5e7-0aeb-4b6f-994a-fc3569a5503a	ece47d54-4a8d-4067-a84b-b68d17915d4b
46251eee-62d6-4397-b3bb-37d6b4b3e910	3a146d2a-75fd-471a-86d9-75957262e8c0
46251eee-62d6-4397-b3bb-37d6b4b3e910	f1200acb-0953-4ed1-9067-dc90cef3b036
\.


--
-- Data for Name: dream_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dream_location (dream_id, location_id) FROM stdin;
2f84c5e7-0aeb-4b6f-994a-fc3569a5503a	6e19991d-22a4-4fec-8856-6e3e0aaa739b
2f84c5e7-0aeb-4b6f-994a-fc3569a5503a	5a82b57f-a7ac-477f-b5e0-d98f5eb29f3e
46251eee-62d6-4397-b3bb-37d6b4b3e910	6e19991d-22a4-4fec-8856-6e3e0aaa739b
\.


--
-- Data for Name: dream_node; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dream_node (id, profile_id, title, dream_description, interpretation, creation_date, privacy_id, state_id, emotion_id, image_url) FROM stdin;
7ee60f56-c099-4a97-8a22-3f6ce2dc52e9	745fdf89-2751-41ee-8554-778ee29f98ae	Ciudad del Futuro	Estaba en una ciudad futurista donde todos podían volar con mochilas propulsoras. Yo intentaba volar pero siempre me quedaba a pocos centímetros del suelo.	Puede reflejar ambiciones altas pero una sensación de no estar alcanzando tu máximo potencial a pesar de tus esfuerzos.	2025-10-12 21:10:33.306	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	\N\N
c26baddc-1aba-41d9-b94c-4a3697fc73c2	745fdf89-2751-41ee-8554-778ee29f98ae	Inundación en casa	Soñé que estaba en mi casa, pero todo estaba inundado. Nadaba entre los muebles buscando algo, pero no sabía qué.	Podría simbolizar emociones reprimidas que te están sobrepasando, tal vez estrés o ansiedad.	2025-10-12 21:10:45.041	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	\N	\N
c139c216-0344-462b-9415-5f3f06e47da4	745fdf89-2751-41ee-8554-778ee29f98ae	La puerta secreta	Soñé que encontraba una puerta pequeña detrás de un mueble, al abrirla había un bosque iluminado con luciérnagas.	Representa el descubrimiento de una parte oculta de ti mismo o una oportunidad inesperada.	2025-10-12 21:10:58.237	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	\N	\N
787f5447-4ed1-4a59-94ed-f2a5a0a266f2	745fdf89-2751-41ee-8554-778ee29f98ae	El discurso improvisado	Estaba dando un discurso frente a miles de personas sin haberlo preparado, pero todos aplaudían igual.	Podría indicar confianza interna emergente, incluso cuando sientes que no estás preparado.	2025-10-12 21:11:08.635	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	\N	\N
5cc3b814-80ca-4e4d-97e2-071787830123	745fdf89-2751-41ee-8554-778ee29f98ae	El discurso improvisado	Estaba dando un discurso frente a miles de personas sin haberlo preparado, pero todos aplaudían igual.	Podría indicar confianza interna emergente, incluso cuando sientes que no estás preparado.	2025-10-12 21:21:35.345	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
39303bbf-1561-48f9-a42f-68bfd6f4612c	745fdf89-2751-41ee-8554-778ee29f98ae	El discurso improvisado 2	Estaba dando un discurso frente a miles de personas sin haberlo preparado, pero todos aplaudían igual.	Podría indicar confianza interna emergente, incluso cuando sientes que no estás preparado.	2025-10-12 21:22:02.538	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
51b0373d-9afd-4776-a396-96aff69fe9cd	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Encuentro con un Perito Inesperado	sonie con un perito	Soñar con un perito podría simbolizar la necesidad de buscar orientación o validación en una situación complicada. Puede representar la búsqueda de respuestas a problemas legales o de confianza en tus habilidades y decisiones.	2025-10-14 21:49:33.694	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	\N
5eac57ef-92c5-4882-9888-7b69ffadb76b	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Encuentro con un Perito Inesperado	sonie con un perito	Soñar con un perito podría simbolizar la necesidad de buscar orientación o validación en una situación complicada. Puede representar la búsqueda de respuestas a problemas legales o de confianza en tus habilidades y decisiones.	2025-10-14 21:49:57.051	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	\N
51b66556-03ec-45c7-bfe6-cf17ab67d0dd	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Alegría canina inesperada	sonie con un perrito	Soñar con un perrito puede representar la lealtad, la protección y la amistad en tu vida. Es posible que estés buscando seguridad emocional o compañía en estos momentos.	2025-10-14 22:21:40.22	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
2454117a-5340-4cc6-90ae-572c67c8331b	745fdf89-2751-41ee-8554-778ee29f98ae	La cena de celebración	soñé que estaba en una cena importante	Soñar con una cena importante puede reflejar tu deseo de reconocimiento social o de celebrar un logro personal. También puede indicar la importancia que le das a la opinión de los demás sobre ti.	2025-10-15 01:12:26.935	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
c046f6db-05f1-45b9-8ac1-b0788f6b721d	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El misterioso gato negro	sonie con un gato	Soñar con un gato puede representar tu lado intuitivo y misterioso. También puede simbolizar tu necesidad de independencia y libertad en tu vida.	2025-10-15 20:40:06.495	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
0f9f20b1-d9bc-45f5-95d0-d799a76b55b0	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explorando nuevas alturas	sonie con una montania	Soñar con una montaña puede representar desafíos en tu vida que estás dispuesto a superar. Puede indicar un deseo de crecimiento personal y la necesidad de enfrentar obstáculos con determinación.	2025-10-15 20:53:27.727	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
359c4fb7-8c64-424d-b7ee-c22fd89febdf	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explorando nuevas alturas	sonie con una montania	Soñar con una montaña puede representar desafíos en tu vida que estás dispuesto a superar. Puede indicar un deseo de crecimiento personal y la necesidad de enfrentar obstáculos con determinación.	2025-10-15 20:56:03.291	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
5dae7a7f-5879-4691-8c2d-775940d0e3ee	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El poderoso mar interior	sonie con el mar y sus olas gigantes	Soñar con el mar y sus olas gigantes puede indicar un sentimiento de inmensidad emocional o un deseo de liberación. Es posible que estés experimentando emociones intensas que necesitas enfrentar o expresar.	2025-10-15 21:16:12.483	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
a7a03672-512c-4ec8-9eca-7ee5b488b99c	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Tranquilidad en el mar	sonie con el mar	oñar con el mar suele representar la tranquilidad, la paz interior y la conexión con tus emociones. Puede indicar un deseo de liberación emocional o un momento de calma en tu vida.	2025-10-15 22:04:08.466	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
6039ea46-820c-400b-b5a9-a1af0ae9976e	745fdf89-2751-41ee-8554-778ee29f98ae	Bosque de Reflexión	Soñé con árboles	oñar con árboles puede representar crecimiento personal, conexión con la naturaleza o el subconsciente. Puede indicar un deseo de buscar equilibrio y paz interior.	2025-10-18 07:10:28.325	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
5b8247d0-59a7-4cec-bbbb-c1eea45cdf10	745fdf89-2751-41ee-8554-778ee29f98ae	Inseguridad en la Cena	Soñé que estaba en una cena muy importante y cuando intentaba comer se me caían los dientes	Este sueño podría reflejar inseguridades o preocupaciones sobre tu imagen o cómo te perciben los demás en situaciones sociales importantes. La pérdida de dientes en los sueños a menudo está asociada con la ansiedad y la autoestima.	2025-10-20 23:34:01.648	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	\N
acd60f8d-4876-4f19-93e8-ca6998b8a008	745fdf89-2751-41ee-8554-778ee29f98ae	Inseguridad en la Cena	Soñé que estaba en una cena muy importante y cuando intentaba comer se me caían los dientes	Este sueño podría reflejar inseguridades o preocupaciones sobre tu imagen o cómo te perciben los demás en situaciones sociales importantes. La pérdida de dientes en los sueños a menudo está asociada con la ansiedad y la autoestima.	2025-10-20 23:34:08.862	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	\N
b54f14a6-aaab-4330-bfb5-f7b6326f1932	745fdf89-2751-41ee-8554-778ee29f98ae	Inseguridad en la Cena	Sueño con imagen	ste sueño podría reflejar inseguridades o preocupaciones sobre tu imagen o cómo te perciben los demás en situaciones sociales importantes. La pérdida de dientes en los sueños a menudo está asociada con la ansiedad y la autoestima.	2025-10-20 23:39:09.56	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	
2e1fcb06-2654-4581-9b4e-d067dd91981d	745fdf89-2751-41ee-8554-778ee29f98ae	Inseguridad en la Cena	Sueño con imagen 2Este sueño podría reflejar inseguridades o preocupaciones sobre tu imagen o cómo te perciben los demás en situaciones sociales importantes. La pérdida de dientes en los sueños a menudo está asociada con la ansiedad y la autoestima.	2025-10-20 23:43:01.211	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	
f0bbe44a-3623-4863-8981-d8f0b913e93a	745fdf89-2751-41ee-8554-778ee29f98ae	Inseguridad en la Cena	Sueño con imagen 2Este sueño podría reflejar inseguridades o preocupaciones sobre tu imagen o cómo te perciben los demás en situaciones sociales importantes. La pérdida de dientes en los sueños a menudo está asociada con la ansiedad y la autoestima.	2025-10-20 23:44:29.102	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761002532286.png
c23c4045-e614-48b9-a03c-26c53ff45035	745fdf89-2751-41ee-8554-778ee29f98ae	Danza frenética en el sueño	soñe que bailaba muy rapido	Soñar que bailas muy rápido puede reflejar tu deseo de llevar una vida más activa y llena de energía. También podría indicar que te sientes abrumado por situaciones que requieren una respuesta rápida y enérgica.	2025-10-21 01:33:18.344	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
369ebdd1-b8af-4ae4-a3be-3439911d0c65	745fdf89-2751-41ee-8554-778ee29f98ae	Danza frenética en el sueño	soñe que bailaba muy rapido	Soñar que bailas muy rápido puede reflejar tu deseo de llevar una vida más activa y llena de energía. También podría indicar que te sientes abrumado por situaciones que requieren una respuesta rápida y enérgica.	2025-10-21 01:36:16.495	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
b0128291-bfc1-4942-a721-9be29bd78298	745fdf89-2751-41ee-8554-778ee29f98ae	Danza frenética en el sueño	soñe que bailaba muy rapido	Soñar que bailas muy rápido puede reflejar tu deseo de llevar una vida más activa y llena de energía. También podría indicar que te sientes abrumado por situaciones que requieren una respuesta rápida y enérgica.	2025-10-21 01:47:12.547	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
afc0ff5b-7b42-4988-9d2f-ffbee0778209	745fdf89-2751-41ee-8554-778ee29f98ae	Danza frenética en el sueño	soñe que bailaba muy rapido	Soñar que bailas muy rápido puede reflejar tu deseo de llevar una vida más activa y llena de energía. También podría indicar que te sientes abrumado por situaciones que requieren una respuesta rápida y enérgica.	2025-10-21 01:49:51.423	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
f17f0d1c-d390-48f5-b27d-7ba1a9112306	745fdf89-2751-41ee-8554-778ee29f98ae	Danza frenética en el sueño	soñe que bailaba muy rapido	Soñar que bailas muy rápido puede reflejar tu deseo de llevar una vida más activa y llena de energía. También podría indicar que te sientes abrumado por situaciones que requieren una respuesta rápida y enérgica.	2025-10-21 01:57:10.269	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
a154baa7-099c-4a03-b30a-e2cba5f18d54	745fdf89-2751-41ee-8554-778ee29f98ae	Danza frenética en el sueño	soñe que bailaba muy rapido	Soñar que bailas muy rápido puede reflejar tu deseo de llevar una vida más activa y llena de energía. También podría indicar que te sientes abrumado por situaciones que requieren una respuesta rápida y enérgica.	2025-10-21 02:02:53.457	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
00108322-0470-4988-8e57-2f5cdf6d31db	745fdf89-2751-41ee-8554-778ee29f98ae	Baño de Fideos	soñe que me bañaba en fideos	Este sueño puede reflejar una sensación de comodidad y satisfacción en tu vida. Puede indicar que te sientes nutrido emocionalmente y que disfrutas de las pequeñas cosas que te brindan alegría y bienestar.	2025-10-21 02:05:35.247	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
c20094fc-0f1f-4430-8e70-6bb18866808a	745fdf89-2751-41ee-8554-778ee29f98ae	Nadando en el Océano Rojo	soñe que nadaba en oceano rojo	Este sueño puede indicar que estás enfrentando una situación emocional intensa y conflictiva en tu vida. El color rojo simboliza pasión, ira o peligro, lo que sugiere que podrías estar experimentando emociones fuertes que requieren ser exploradas y comprendidas.	2025-10-21 02:20:10.114	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	\N
e04f8129-251c-40c2-a08a-553ccb64d822	745fdf89-2751-41ee-8554-778ee29f98ae	Baño en Rojo	SOÑE QUE ME BAÑABA EN ROJOSoñar con bañarse en rojo puede representar una fuerte pasión o energía emocional en tu vida. Puede indicar un deseo de intensidad, poder o amor apasionado. También podría simbolizar agresividad o enojo reprimido que necesita ser liberado.	2025-10-21 02:23:45.054	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	\N
8cdba619-619e-405b-baa8-d970b69e4411	745fdf89-2751-41ee-8554-778ee29f98ae	Baño en Tonalidades Rojas	SOÑE QUE ME BAÑABA EN ROJO	Soñar con bañarse en rojo puede simbolizar pasión, energía intensa o incluso ira reprimida. Puede reflejar una necesidad de expresar emociones fuertes o confrontar situaciones conflictivas en tu vida.	2025-10-21 02:27:54.869	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	\N
067facb2-d205-4883-b7c2-79f1956207df	745fdf89-2751-41ee-8554-778ee29f98ae	Baño en Rojo	SOÑE QUE ME BAÑABA EN ROJOSoñar con bañarse en rojo puede representar una intensa pasión o deseo en tu vida. Puede indicar una fuerte energía sexual, impulsividad o emociones intensas que necesitas expresar o controlar.	2025-10-21 02:35:04.48	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	\N
1dd48d79-31c4-4f25-91cc-f7147862e176	745fdf89-2751-41ee-8554-778ee29f98ae	Bañándome en Rojo	SOÑE QUE ME BAÑABA EN ROJO	Soñar con bañarse en rojo puede reflejar una intensa pasión o deseo en tu vida. También puede simbolizar emociones fuertes como ira, amor apasionado o energía sexual. Es importante reflexionar sobre qué aspectos de tu vida están cargados de intensidad emocional en este momento.	2025-10-21 02:36:40.545	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	\N
a8e14250-aebb-47ad-9027-18a237ad0bce	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explorando la Belleza Interior	sonie lindoEste sueño puede reflejar un deseo de conectarte con tu lado más bello y positivo. Puede indicar una búsqueda de autoaceptación y amor propio. Es posible que estés en un proceso de descubrimiento personal y crecimiento emocional.	2025-10-22 02:18:46.682	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
a94423a4-a1bf-498d-831e-ec265e448786	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Reencuentro con la felicidad perdida	tuve u suenio hermoso	Este sueño puede reflejar un anhelo de volver a experimentar momentos felices del pasado o un deseo de encontrar la felicidad perdida. Puede ser una señal de que es importante para ti buscar la alegría y la satisfacción en tu vida actual.	2025-10-22 02:22:07.627	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
b5cbc767-bcf7-4c11-a718-63565f5ed7fb	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Amistad fiel en sueños	sonie con un perrito	Soñar con un perrito puede simbolizar la lealtad, la protección y la amistad en tu vida. Es posible que estés buscando apoyo emocional o compañía en tu entorno. También puede representar la necesidad de cuidar y ser cuidado.	2025-10-22 02:24:01.687	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
067baf2a-391a-47a7-8c6f-76571e3d46db	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explorando la Belleza Onírica	que lindo es soniar	Este sueño sugiere que disfrutas de la experiencia de soñar y encuentras belleza en tu mundo interior. Puede reflejar una necesidad de escapar de la realidad o de explorar tu creatividad y emociones más profundas.	2025-10-22 02:31:01.363	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
482ac2ac-8675-4834-96bd-1c833bf884bd	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Encuentro con el Perito Misterioso	sonie con un perito	Soñar con un perito puede representar la necesidad de buscar claridad y validación en tus decisiones o acciones en la vida real. Puede indicar que estás buscando a alguien con autoridad o experiencia para guiarte en un asunto importante.	2025-10-22 02:35:38.02	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
a8cd94b6-3504-4672-8361-52ece38f675c	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El perito en mi sueño	sonie con un peritoSoñar con un perito puede reflejar tu deseo de buscar claridad y objetividad en una situación confusa en tu vida. Puede indicar la necesidad de evaluar detenidamente tus decisiones y acciones para tomar las mejores elecciones.	2025-10-22 02:39:19.161	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
6af23aae-3c09-445a-94b7-2a472ef2b4f1	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El perito en mi sueño	sonie con un peritoSoñar con un perito puede reflejar tu deseo de buscar claridad y objetividad en una situación confusa en tu vida. Puede indicar la necesidad de evaluar detenidamente tus decisiones y acciones para tomar las mejores elecciones.	2025-10-22 02:39:27.242	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
6d6aa7be-7e05-41f6-9e71-e504e16c9d1a	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El perito en mi sueño	sonie con un peritoSoñar con un perito puede reflejar tu deseo de buscar claridad y objetividad en una situación confusa en tu vida. Puede indicar la necesidad de evaluar detenidamente tus decisiones y acciones para tomar las mejores elecciones.	2025-10-22 02:39:35.608	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
15b474a3-24d7-4a48-9f73-d37ff1c095c4	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Alegría y protección en forma de perrito	onie con u perrito	Soñar con un perrito puede representar la lealtad, la amistad y la protección. Es posible que estés buscando apoyo o compañía en tu vida. Puede indicar también un deseo de cuidar y ser cuidado.	2025-10-22 02:40:45.384	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
867ed760-2cc1-4efa-a008-90d3905c7231	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El compañero fiel	sonie con u perritoSoñar con un perrito puede representar lealtad, amistad y protección. Es posible que necesites confiar en alguien o que valores la fidelidad en tus relaciones cercanas.	2025-10-22 02:41:52.754	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
74760a40-e46a-47bd-9155-8bb24c686a71	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El vestido de la autoexpresión	sonie con un vestido	Soñar con un vestido puede representar la necesidad de mostrar tu verdadera personalidad o de expresarte de una manera más auténtica. Puede reflejar un deseo de ser visto y reconocido tal como eres en tu interior.	2025-10-22 02:42:29	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
113c146f-b364-4d91-9e78-9464f9f2bf77	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El compañero leal	sonie con un perrito	Soñar con un perrito puede representar lealtad, protección y amistad. Puede indicar la necesidad de afecto y compañía en tu vida o la presencia de alguien en quien confiar.	2025-10-22 03:03:27.532	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
61451f1d-bb8f-44b5-8fc8-257c9db85726	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Alegría con un nuevo amigo	sonie con un perrito	Soñar con un perrito puede representar la llegada de un nuevo amigo o compañero en tu vida. Esta figura simboliza lealtad, protección y compañerismo, lo que sugiere que estás buscando o necesitas estas cualidades en tu entorno cercano.	2025-10-22 03:04:39.91	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
f6b215ac-70b8-4bc7-aff4-2496abc3e266	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La compañía fiel del perrito	sonie con un perrito	Soñar con un perrito puede representar la lealtad, la amistad y la protección en tu vida. Es posible que estés buscando seguridad emocional o apoyo en tus relaciones. También podría indicar la necesidad de conectarte con tu lado más juguetón y amoroso.	2025-10-22 03:07:25.128	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
e52d83bf-754b-4ade-bdaf-6bf6ce05aea6	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Dulce compañía felina	sonie con un gatitoSoñar con un gatito puede representar la necesidad de afecto y ternura en tu vida. Puede simbolizar también la parte más juguetona y curiosa de tu personalidad que busca explorar nuevas experiencias.	2025-10-22 03:11:05.533	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
3aaad32d-871a-419a-aecf-1610c2c16849	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Alegría en compañía canina	sonie con un perrito	Soñar con un perrito puede representar lealtad, amistad y protección. Es posible que estés buscando apoyo emocional o que valores mucho la fidelidad en tus relaciones.	2025-10-22 03:14:00.018	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
74013f76-eb2f-4db3-a3ca-46c167200f49	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Alegría y compañía canina	sonie con un perrito	Soñar con un perrito puede representar la lealtad, la protección y la amistad. Es posible que anheles compañía, afecto o apoyo en tu vida actual.	2025-10-22 03:20:35.972	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
d18b365f-ca22-43ca-ab33-937bf328dd95	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Alegría canina	sonie con un perrito	Soñar con un perrito puede representar la lealtad, la protección o la amistad en tu vida. Es posible que estés buscando compañía, afecto o seguridad emocional en tu entorno.	2025-10-22 03:22:19.18	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
320a9121-93d0-4525-8630-6f74d9aa79ca	c4efd970-b52b-4db8-8fb4-fa293fcc9517	En búsqueda de seguridad emocional	seguridad es lo mejor	El sueño refleja un anhelo profundo por sentirse seguro emocionalmente, simbolizado por la constante búsqueda de la seguridad. Puede indicar inseguridades arraigadas o la necesidad de establecer límites para protegerse. Es probable que el soñante esté experimentando ansiedad o preocupación por su bienestar emocional y busque formas de fortalecer su autoestima y confianza.	2025-10-22 03:31:49.986	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	
2ace3365-16c4-4fb4-8949-678953a2e151	745fdf89-2751-41ee-8554-778ee29f98ae	Inseguridad en la Cena	Soñé que estaba en una cena muy importante y cuando intentaba comer se me caían los dientes	Este sueño podría reflejar inseguridades o preocupaciones sobre tu imagen o cómo te perciben los demás en situaciones sociales importantes. La pérdida de dientes en los sueños a menudo está asociada con la ansiedad y la autoestima.	2025-10-22 03:32:12.254	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761002532286.png
771ed01f-ccb5-4876-9534-fa6c232629ca	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Fiel Compañero Peludo	sonie con un perrito\n	El perrito simboliza lealtad y protección. Este sueño podría reflejar tu anhelo de seguridad y afecto incondicional en tu vida. Podrías estar experimentando una necesidad de conexión emocional y apoyo en tus relaciones cercanas. Es posible que te sientas en búsqueda de estabilidad y compañerismo.	2025-10-22 04:14:31.279	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761106130473.png
a0fb1c16-bef2-49f0-a37f-55e2043c3870	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La ternura del compañero fiel	sonie con un perrito lindo	El perrito en tu sueño simboliza lealtad y compañerismo. Su ternura representa tu necesidad de afecto y conexión emocional. Este sueño sugiere que buscas relaciones sinceras y apoyo afectivo en tu vida. Podrías sentirte anhelante de cariño y comprensión en tu entorno.	2025-10-22 04:48:25.879	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761108482195.png
c3f1ffc0-6d1e-4485-ae51-eda20904419f	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Encuentro Celestial	sonie con un angerlSoñar con un ángel puede representar la búsqueda de protección, guía espiritual o conexión con lo divino. Puede reflejar un anhelo de paz interior o superación de dificultades. Este sueño sugiere una necesidad de creer en algo superior o encontrar consuelo en momentos de incertidumbre.	2025-10-22 05:03:42.465	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761109416595.png
972a3d4b-f9ec-40dc-acbe-d7964a53398b	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El árbol de la vida	sonie con un arbolEl árbol simboliza crecimiento personal y conexiones con la naturaleza. Puede reflejar la búsqueda de estabilidad y desarrollo interior. Este sueño sugiere un anhelo de arraigo emocional o la necesidad de nutrir aspectos esenciales de tu ser. Podría indicar un deseo de conexión con tus raíces o explorar nuevas direcciones en tu vida.	2025-10-22 05:10:51.185	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761109844407.png
97b6f9ba-1988-4b56-9b91-b3f8bfba4437	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La conexión con lo puro	sonie con un erritoSoñar con un perrito puede representar la inocencia, lealtad y protección. Puede indicar un deseo de afecto sincero o la presencia de un amigo fiel en la vida del soñante. También podría reflejar la necesidad de cuidado y cariño, así como la búsqueda de emociones simples y genuinas. La presencia de un perrito en el sueño puede revelar un anhelo de conexión emocional y de regresar a lo básico y puro.	2025-10-22 05:14:33.851	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761110069240.png
5a434cd5-e758-4069-a5b8-6dc4385dcc10	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Perito Evaluador	sonie con un perito\n	Soñar con un perito puede representar la necesidad de evaluarte a ti mismo o de ser juzgado por otros. Puede indicar inseguridades sobre tus capacidades o temor a ser expuesto. Este sueño sugiere un conflicto interno entre la autoevaluación y la aceptación externa. Podría reflejar ansiedad por ser medido y comparado.	2025-10-22 05:38:49.213	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761111520961.png
5163aaa0-86a1-40c0-8cf1-e9bfdbedfa63	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Mensaje Celestial	sonie con un angel de Dios	Soñar con un ángel de Dios simboliza protección, guía espiritual o una intervención divina en tu vida. Puede reflejar la búsqueda de significado o conexión espiritual. Es posible que sientas admiración, asombro o un anhelo por lo trascendental en tu interior. Este sueño sugiere un despertar espiritual o la necesidad de fe en momentos de incertidumbre.	2025-10-22 05:43:17.395	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761111789691.png
75e0c48b-2233-4e63-8c90-b90fae1b86e2	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Ternura del Nuevo Comienzo	sonie con mi hijjro cuando recien nacio que dormia de una forma tan tierna	Soñar con tu hijo recién nacido durmiendo de forma tierna simboliza el amor incondicional, la vulnerabilidad y la pureza. Puede reflejar tu deseo de proteger y nutrir esta nueva etapa en tu vida. Este sueño revela emociones de amor profundo, responsabilidad y cuidado. Tu estado emocional parece estar lleno de afecto y conexión emocional.	2025-10-22 05:51:12.856	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761112262656.png
6e4b5f67-6fea-465e-80fb-fcb6b1ca65c0	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Lealtad y Protección Canina	sonie con un perro	Soñar con un perro puede simbolizar lealtad, protección y fidelidad. Puede reflejar la necesidad de afecto, compañía o seguridad emocional en tu vida. Es posible que exista un deseo oculto de conexión o fidelidad en tus relaciones personales. Este sueño sugiere la importancia de la confianza y la lealtad en tus vínculos emocionales.	2025-10-22 05:56:12.523	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761112566240.png
a8d2d1df-6ca7-4128-b67d-40dea906bee4	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Misterioso Gato Nocturno	sonie con un gato	El gato en los sueños suele representar la intuición, la astucia y la independencia. Puede indicar un deseo de explorar lo desconocido o de confiar más en tus instintos. Quizás estés lidiando con un conflicto interno entre tu deseo de libertad y tu necesidad de seguridad emocional. Este sueño sugiere una fase de autodescubrimiento y exploración de tu mundo interior.	2025-10-22 05:57:35.731	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761112650823.png
256a86db-1bf2-4b7c-8d6c-8b3b3840f2db	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Confianza en lo desconocido	conie don un perro	Soñar con un perro puede representar lealtad, protección o instintos básicos. La situación de estar con un perro desconocido sugiere confianza en nuevas experiencias. El sueño puede reflejar un deseo de seguridad y compañía en un entorno desconocido, revelando una necesidad de explorar lo inexplorado.	2025-10-22 05:58:49.38	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761112725038.png
8fb9c3dc-7d12-4585-9e2a-6287d001c447	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La conexión con la lealtad	sonie con u perrito	Soñar con un perrito puede simbolizar la lealtad, la protección o la compañía en la vida del soñante. La imagen del cachorro puede representar la necesidad de afecto, cuidado o atención en su entorno emocional. Es posible que el soñante esté buscando seguridad emocional o afectiva en sus relaciones. Este sueño también puede reflejar un deseo de conexión genuina y fidelidad en su vida.	2025-10-22 06:17:39.41	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761113852959.png
c05e7288-1b34-4742-8591-48a60a6982cf	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Almohada Protectora	sonie con una almohada	La almohada simboliza seguridad y comodidad, siendo un refugio para el descanso. Este sueño puede reflejar un deseo de tranquilidad y protección emocional en la vida del soñante. Podría indicar una necesidad de buscar apoyo o consuelo en momentos de vulnerabilidad emocional.	2025-10-22 06:22:19.254	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761114126442.png
1eb77487-c6a4-4e77-bb72-e5c638e4a3d5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La presencia femenina	sonie con una mujerSoñar con una mujer puede representar aspectos femeninos en el soñante como intuición, sensibilidad o creatividad. También podría reflejar la relación con la madre o con figuras femeninas significativas en su vida. Este sueño podría indicar un anhelo de conexión emocional o la necesidad de explorar y comprender mejor sus propias emociones.	2025-10-22 06:28:36.272	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761114509984.png
e7a9aeee-d478-4f5e-b2c4-bbfbe1f848d9	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Presencia Misteriosa del Gato	sonie con un gato	El gato simboliza la intuición, misterio y autonomía. Puede representar un aspecto oculto de ti mismo o la necesidad de independencia. Las emociones asociadas pueden ser curiosidad, desconfianza o la búsqueda de libertad. Este sueño sugiere una conexión con tu lado más instintivo y la exploración de tu propia esencia.	2025-10-22 06:35:27.743	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	28ef5090-cba6-4e56-8c96-cb8091581dcc	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761114914830.png
c7e02fbd-83e6-4bc0-b759-cedd81103084	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Invasión de la Cucaracha	sonie con una cucaracha	Soñar con una cucaracha puede simbolizar sentimientos de repulsión o asco hacia uno mismo o alguna situación en la vida real. Puede representar la presencia de pensamientos negativos o tóxicos que están afectando la autoestima o la percepción personal. Este sueño puede reflejar la necesidad de enfrentar y limpiar aspectos oscuros o indeseados de la propia personalidad. Es importante reconocer y trabajar en la aceptación y transformación de estas partes de uno mismo para alcanzar la autocomprensión y el crecimiento emocional.	2025-10-22 06:39:17.232	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761115151913.png
4d8f7d6b-b69a-422a-8b9e-f64f9f92a034	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Mensaje de la Abeja	sonie con una abejaSoñar con una abeja puede simbolizar trabajo arduo y dedicación en un proyecto importante. Puede representar la importancia de la comunidad y la colaboración. El soñante podría sentirse motivado por la laboriosidad y la organización de las abejas, reflejando un deseo de lograr metas con esfuerzo y cooperación.	2025-10-22 06:41:59.662	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761115315033.png
39273837-fe6e-4e39-a077-e2590afbc96d	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Sed de Vida en la Oscuridad	sonie con un vampiro	Soñar con un vampiro puede representar emociones de manipulación o dependencia en tu vida. Los vampiros suelen simbolizar la necesidad de energía vital de otros. Puede indicar que te sientes agotado por relaciones tóxicas que te quitan tu vitalidad. Este sueño puede reflejar tu temor a ser dominado o controlado por fuerzas externas.	2025-10-22 06:51:29.062	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761115883280.png
18cb8b5a-e16b-42fa-b830-9658e024f0ee	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Mensaje del Pájaro	sonie con un pajaroEl pájaro simboliza libertad y espiritualidad. Puede representar el deseo de liberarse de limitaciones o enfrentar una situación con más ligereza. El soñante podría sentirse atrapado o buscando respuestas profundas en su vida. Este sueño sugiere la necesidad de explorar la espiritualidad y el autoconocimiento.	2025-10-22 06:52:33.189	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761115947340.png
e3563a3d-84b9-4e9d-b541-f96475f6c6f9	745fdf89-2751-41ee-8554-778ee29f98ae	Guardián de lo Oculto	soñé con un gato chiquitito	El gato chiquitito simboliza intuición, autonomía y misterio. Su tamaño reducido subraya un aspecto protegido de tu psique que crece silenciosamente. Este animal representa conexiones espirituales, discernimiento sutil y la capacidad de ver más allá de lo evidente. Tu subconsciente destaca la importancia de honrar lo pequeño pero significativo, confiando en tu voz interior y prestando atención a detalles que otros pasan por alto.	2025-10-22 14:30:28.396	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761143391210.png
04338a9d-6563-4a34-8897-b997364e3207	745fdf89-2751-41ee-8554-778ee29f98ae	Danza con felinos púrpuras	soñe que bailaba con gatos color violeta	Soñar con bailar con gatos de color violeta puede representar tu deseo de libertad y expresión creativa. Los gatos simbolizan la independencia y la intuición, mientras que el color violeta puede indicar transformación espiritual y conexión con lo divino.	2025-10-22 14:36:22.868	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
468307ba-8675-4fe3-8ee4-2a1f21831a7a	745fdf89-2751-41ee-8554-778ee29f98ae	Danza felina violeta	soñe que bailaba con gatos color violeta	Este sueño puede representar tu deseo de libertad y expresión personal. Los gatos son símbolos de independencia y misterio, mientras que el color violeta puede indicar creatividad y transformación en tu vida.	2025-10-22 14:38:00.315	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
c0960a36-8c59-4ff2-ae66-93ecb16d0f41	745fdf89-2751-41ee-8554-778ee29f98ae	Deliciosos burritos violeta	soñe que comia burritos de color violeta	El color violeta en los sueños puede representar creatividad y transformación. Comer burritos puede simbolizar la necesidad de nutrir tu creatividad y probar cosas nuevas en tu vida.	2025-10-22 15:13:21.826	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
15f68edc-e8db-4ee3-bcd1-45a82575f632	745fdf89-2751-41ee-8554-778ee29f98ae	Deliciosos burritos morados	soñe que comia burritos de color violeta	El color violeta en los sueños puede representar la creatividad y la intuición. Comer burritos indica satisfacción y comodidad. Este sueño puede sugerir que estás explorando nuevas ideas creativas y te sientes satisfecho con tus decisiones recientes.	2025-10-22 15:18:15.067	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
2bdd5e87-c5f4-4539-8a2a-44082ed07887	745fdf89-2751-41ee-8554-778ee29f98ae	Libertad en el aire	soñe con perror volando 	Soñar con perros volando puede representar un deseo de libertad y escapar de situaciones que te hacen sentir atrapado. Puede indicar también un anhelo de explorar nuevas posibilidades y romper con limitaciones autoimpuestas.	2025-10-22 15:19:16.524	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
53e8bc78-0917-464b-bf8e-8ce178dda243	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Belleza de lo Simple	sonie algo lindo	ste sueño refleja tu anhelo de encontrar belleza en las cosas simples de la vida. Puede simbolizar una necesidad de disfrutar y valorar los momentos cotidianos. Es posible que sientas una profunda gratitud y alegría por las pequeñas cosas que te rodean, buscando la belleza en la simplicidad.	2025-10-22 21:27:07.053	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761168391609.png
fa097b05-30d4-410a-824e-b8b17e6b780c	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Inesperada Amistad	ayer sone que tome el  te con buzz lightyear	El té representa calma y socialización, mientras que Buzz Lightyear simboliza la valentía y la aventura. Este sueño podría reflejar tu deseo de equilibrar la serenidad con la emoción y la audacia en tu vida. Puede indicar una búsqueda de nuevas amistades o experiencias emocionantes. Es posible que te sientas atraído por la idea de encontrar alegría en lo inesperado.	2025-10-22 21:49:56.516	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761169725538.png
386ef4a0-7988-43da-b9fb-6d5bf586b9df	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Campo de Margaritas con Caras de Perros	sole que corria por un campo lleno de margaritas pero que tenian cara de perros y yo esyaba descalzo	El campo de margaritas simboliza la paz y la libertad, pero al tener caras de perros refleja una sensación de traición o amenaza en un entorno aparentemente seguro. Estar descalzo añade vulnerabilidad y conexión con la naturaleza. El soñante puede sentir miedo a ser lastimado por aquellos en quienes confía, revelando una sensación de inseguridad emocional.	2025-10-22 22:04:57.611	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761170645994.png
9ca98022-8942-4259-b8ee-10422ff5901a	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Caída del Abismo	con una caids\n	Soñar con una caída simboliza miedo al fracaso o a perder el control en la vida. Puede reflejar inseguridades o temores internos que te impiden avanzar. La sensación de caer puede estar relacionada con la falta de estabilidad emocional o la necesidad de tomar decisiones importantes.	2025-10-22 22:10:23.766	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761170921366.png
ea3e3cb2-0752-4d8a-aa21-8a75515fc9cc	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La fortuna de mamá	sonie que mi mama se gano 6 millones de pesos	Soñar que tu madre gana 6 millones de pesos simboliza un deseo subconsciente de seguridad financiera y estabilidad emocional. Puede reflejar la admiración y dependencia que sientes hacia ella, así como el deseo de que sea recompensada. Este sueño sugiere la importancia de la figura materna en tu vida y tu necesidad de sentirte protegido/a y cuidado/a.	2025-10-22 22:15:33.725	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761171270911.png
a4627799-a33a-449a-959b-f90f55d5fa28	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La presencia recurrente de mamá	sonie con mi mama que fallecio hace dos anios a veces se hace recurrente el mismo	El sueño con la madre fallecida simboliza la necesidad de conexión emocional y apoyo. Puede reflejar un deseo de resolver conflictos no resueltos o expresar amor y gratitud. La recurrencia sugiere un anhelo persistente de su presencia y guía en momentos de incertidumbre, revelando un proceso de duelo aún no concluido.	2025-10-22 22:20:26.512	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	28ef5090-cba6-4e56-8c96-cb8091581dcc	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761171556754.png
8fe942cf-6f39-411c-9b55-46d74f66ff58	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Poder de Superman	sonie que era superman	Soñar que eres Superman simboliza un deseo de poder, control y superación personal. Puede reflejar una necesidad de sentirte invencible o protegido ante situaciones que te generan miedo o inseguridad. Este sueño revela una búsqueda de fuerza interna y confianza en tus capacidades, pero también la posibilidad de estar enfrentando desafíos que te hacen sentir vulnerable.	2025-10-22 22:24:15.58	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761171805114.png
6913d012-c366-4c1b-afd4-5c6082d7bd73	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Amistad Inesperada	estoy en una isla y empiezo a correr, me persigue un oso y despues nos hacemos amigos\n	El oso simboliza tus miedos o instintos salvajes que intentan alcanzarte, mientras que la isla representa la sensación de soledad o aislamiento. El hecho de que finalmente te hagas amigo del oso sugiere que estás aceptando y reconciliándote con esas partes de ti mismo que temías o ignorabas. Este sueño refleja un proceso de integración y autoaceptación.	2025-10-22 22:27:57.074	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761172012660.png
f2c7fc2d-7097-4abf-8250-98c9f061a285	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Ritmo Mortal	percusion con zombies	Percutir con zombies simboliza la lucha interna entre la creatividad y el aspecto oscuro de la mente. Los zombies representan miedos o pensamientos negativos que interfieren con la expresión artística. El soñante puede sentirse atrapado entre su pasión y sus temores, buscando liberarse de limitaciones mentales.	2025-10-22 22:32:09.593	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761172269959.png
4d03ec6b-cae0-4a8e-a4da-d3cecbe4beb5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Unión Fragilizada	sone que me casaba y la persona con la que me casaba tenia los zapatos rotos.	Soñar con casarse simboliza la unión y compromiso. Los zapatos rotos de tu pareja representan inseguridad o falta de estabilidad en la relación. Puedes sentir temor de que la relación esté en peligro o de que tu pareja no esté a la altura de tus expectativas, generando ansiedad y dudas sobre el futuro de la relación.	2025-10-22 22:36:33.343	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761172547997.png
b31649b2-9282-4c9a-82c1-809e0d356ca0	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Alarmas en el Momento Justo	Cada vez que estoy sonando algo y va a ocurrir algo puntual, me suena la alarma en ese preciso momento	Este sueño sugiere una conexión entre tu mundo interno y externo, representada por la alarma como un aviso de eventos importantes. Puede reflejar tu preocupación por no perder oportunidades o por no estar preparado para lo que viene. Es posible que estés sintiendo ansiedad por el futuro y la necesidad de estar alerta en tu vida diaria. El constante sonar de la alarma puede indicar un llamado a prestar más atención a tu intuición y a los avisos que recibes.	2025-10-22 22:40:43.941	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761172800547.png
e47bb951-e379-46dc-b06b-11a18176ae27	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Riqueza Abundante	sueno que gano muchisima plata	Soñar con ganar mucha plata simboliza deseos de éxito, seguridad y reconocimiento. Puede reflejar ambiciones materiales o la búsqueda de validación externa. El soñante podría sentirse ansioso por alcanzar metas financieras o inseguro sobre su valía personal, buscando afirmación a través del dinero.	2025-10-22 22:53:44.526	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761173546525.png
4e833247-080c-4166-99ac-09fec7a921b4	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Ahogado en el Mar	sonia que me ahogaba en un mar	Soñar con ser ahogado en un mar puede reflejar sentimientos abrumadores de ansiedad o falta de control en la vida. El mar simboliza emociones profundas y desconocidas, sugiriendo que el soñante podría estar siendo arrastrado por sus propias emociones. La sensación de ahogo revela un miedo a ser dominado por circunstancias externas o internas, indicando la necesidad de confrontar y manejar estos sentimientos para evitar ser consumido por ellos.	2025-10-22 22:58:21.053	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761173809729.png
c74e522b-3ebf-449b-bafa-ea8935937c10	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Caída Infinita desde lo Alto	estaba en una cama superpuesta y yo trepaba muebles hasta caerme pero era una caida infinita	Este sueño sugiere una sensación de inestabilidad y descontrol en tu vida, representada por la caída infinita desde la cama superpuesta. Trepando muebles para luego caer, refleja tu lucha interna por alcanzar metas o ambiciones, pero experimentas una constante caída. La sensación de infinitud aumenta el sentimiento de ansiedad y falta de dirección en tu vida. Es importante reflexionar sobre qué aspectos de tu vida te hacen sentir fuera de control.	2025-10-22 23:01:17.906	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761174042414.png
844a1a97-1c1a-4a3e-a951-9d217c73c705	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Perder la Esencia	sonie que a mi perro se le caia su nariz	La nariz del perro, al ser un elemento clave para percibir el mundo, podría simbolizar la capacidad de seguir los instintos o la intuición. La pérdida de esta parte sugiere una desconexión con la esencia o la autenticidad. El soñante podría estar experimentando una sensación de desorientación o pérdida de identidad, quizás debido a un conflicto interno entre seguir su intuición o actuar racionalmente.	2025-10-22 23:06:10.264	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	28ef5090-cba6-4e56-8c96-cb8091581dcc	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761174295982.png
8a176233-9cfd-41b8-b8d4-141ebce60d1e	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La manada de caniches	sone que estaba en mi casa rodeada de muchos cachorros caniches 	Los cachorros caniches simbolizan la inocencia, la lealtad y la protección. Estar rodeado de ellos en tu casa sugiere un deseo de seguridad emocional y compañía afectuosa. Es posible que te sientas en busca de apoyo y cercanía en tu entorno íntimo. Este sueño refleja un anhelo de conexión y calidez en tu vida emocional.2025-10-22 23:10:12.985	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761174531956.png
31dc7d32-1ecd-46e2-acf0-685175659584	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Desarmado en el Camino	sonie que iba en un auto que se desarmaba en el camino	El auto desarmado simboliza la sensación de falta de control en la vida del soñante, posiblemente relacionado con la inseguridad o la incapacidad para manejar situaciones estresantes. Este sueño puede reflejar un miedo subyacente a la pérdida de estabilidad o a la incapacidad para mantenerse a flote en medio de desafíos. El soñante podría estar experimentando ansiedad por no poder mantener un rumbo claro en su vida.	2025-10-22 23:14:48.104	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761174830059.png
83cb1acc-f16c-4b47-ba86-35d1f03ca88c	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Superando el peligro con ingenio	sone que estaba con mis amigos por mi barrio y nos pereguia un tigre y le ganamos explotando globos	El tigre simboliza el miedo o la amenaza en tu vida. Estar con amigos representa el apoyo social. Explotar globos indica encontrar soluciones inesperadas a tus problemas. Este sueño sugiere que, aunque te enfrentes a situaciones intimidantes, tienes la capacidad de superarlas con creatividad y el apoyo de tus seres queridos.	2025-10-22 23:18:55.633	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761175089475.png
00a5fce4-c9b2-4c8a-b4b1-eaa4b7fafa00	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Batalla Épica con Goku	Sone que estaba peleando con goku contra freezer	Soñar con pelear junto a Goku contra Freezer simboliza el deseo de enfrentar desafíos con valentía y determinación. Puede reflejar la búsqueda de superar obstáculos en tu vida real, mostrando tu anhelo de poder y control. Es probable que te sientas motivado a enfrentar tus miedos internos y luchar por tus metas con fuerza y coraje.	2025-10-22 23:22:06.485	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761175256746.png
cda63bf8-d07b-48aa-9a2b-664471bfd21d	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Vínculo Fraternal Abrazador	sonie que abrazaba fuerter a mi hermana	El abrazo en el sueño simboliza la conexión emocional y el apoyo entre tú y tu hermana. Puede reflejar un deseo de protegerla o la necesidad de expresar amor y cercanía. Este gesto puede revelar un anhelo de fortalecer la relación fraternal o resolver conflictos pendientes. El sueño sugiere una sensación de afecto y compromiso familiar.	2025-10-22 23:27:53.401	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761175606601.png
71a76957-4d99-4e19-95a2-c7f284641628	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Vuelo repentino en la playa	sonie que estaba en la playa, se nublaba todo de repente y un viento me llevo volando	El estar en la playa simboliza tu conexión con tus emociones y la nube repentina indica confusión o incertidumbre en tu vida. El viento que te lleva volando sugiere un deseo de liberación o escapismo de situaciones que te abruman. Este sueño refleja un anhelo de libertad y búsqueda de nuevas perspectivas.	2025-10-22 23:35:22.748	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761176070079.png
e82b2b35-bec3-4833-b37d-1b2e9b6a80da	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Transformación Zombie	sonie que me convertia en un zombie, me atacaban y yo me convert[ia en uno y despues mi amigo mor[ia desangrado	El sueño de convertirte en zombie simboliza la pérdida de identidad o sentirte alienado en tu vida. Ser atacado refleja la sensación de vulnerabilidad o presión externa. La muerte de tu amigo puede representar el miedo a perder relaciones cercanas. Estos elementos sugieren un temor a la soledad o a no ser comprendido.	2025-10-22 23:38:41.495	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761176279429.png
12b9207d-0252-426d-adaa-bc3496f1560b	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Miedo y Culpa Despertados	sonie que una arania me picaba, eso me desperto y patee a mi gato	El sueño revela tu miedo a ser herido o traicionado, simbolizado por la araña que te pica. Patear al gato representa la proyección de esa ansiedad en un ser cercano. Existe un conflicto interno entre tu instinto de protección y tu temor a ser lastimado, generando culpa.	2025-10-22 23:42:48.68	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761176528354.png
dab4b49b-88db-44f4-809b-42327a1b2869	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Persecución Gelatinosa	sonie con un monstruo gelatinosao verde similar al de los cazafantasmas, que me perseguia por la terraza	El monstruo gelatinoso verde puede representar tus miedos o inseguridades que te persiguen, como una manifestación de tus temores más profundos. La terraza simboliza un lugar de escape limitado, donde sientes que no puedes evitar confrontar estos miedos. Es posible que te sientas abrumado por situaciones o emociones que crees incontrolables.	2025-10-22 23:49:30.903	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761176921932.png
413af298-bb47-4c91-a402-a9c353a6dee5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Encuentro en el Pasado	Hoy sone que viajaba en el pasado y conocia a los dinosaurios	Este sueño sugiere un anhelo de conexión con tus raíces o tu niñez, representado por el viaje al pasado. Los dinosaurios simbolizan la grandeza y lo antiguo, posiblemente reflejando un deseo de explorar aspectos profundos y primitivos de tu ser. Tu emoción al encontrarte con ellos puede indicar nostalgia, curiosidad o un anhelo de descubrimiento personal.	2025-10-22 23:56:02.127	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761177318645.png
233aaa26-9457-4b29-9b9b-f4a64720eb17	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Picadura de la Araña	que me pico una arana	Soñar con ser picado por una araña puede representar sentimientos de traición o engaño en tu vida. Este sueño sugiere una sensación de vulnerabilidad y desconfianza hacia quienes te rodean. Es posible que estés experimentando temores ocultos o paranoia en tus relaciones interpersonales, lo que refleja una preocupación por ser lastimado emocionalmente. Es crucial examinar tus vínculos y aprender a confiar en otros para superar estos miedos.	2025-10-23 00:00:38.173	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761177575808.png
c4a6a3f1-3b53-44ef-b56f-d5dfe2cde651	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Desprendimiento Dental	se me caian los dientes	Soñar con la caída de los dientes suele estar relacionado con sentimientos de vulnerabilidad, inseguridad o temor a envejecer. Los dientes representan nuestra imagen exterior y fuerza vital, por lo que su pérdida simboliza un miedo a la pérdida de poder o a enfrentar situaciones que nos hacen sentir débiles. Es posible que el soñante esté experimentando un momento de cambios o crisis que afectan su autoestima y confianza en sí mismo.	2025-10-23 00:10:00.766	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761178120956.png
8538245e-c5c1-41ab-bfae-dec687b624ee	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Vulnerabilidad en la Oscuridad	Sonie que estaba jugando al rust y me raidearon mi casa estaba con mi amigo renjats y caiamos en una cueva profunda. Despues de eso peleamos con enemigos	El juego de Rust simboliza la supervivencia y la competencia. El raideo de tu casa representa sentirte invadido o vulnerable en tu espacio seguro. Caer en la cueva profunda representa adentrarse en tus miedos internos. La pelea con los enemigos refleja un enfrentamiento con tus propias sombras y conflictos internos.	2025-10-23 00:16:58.237	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761178572750.png
571c78bc-4bca-43e0-9ff2-210bec3906bc	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Correr sin Movimiento	hoy sonie que intentaba correr pero no podia, mis piernas no respondian y senti una profunda angustia	El acto de correr simboliza la búsqueda de metas o escapar de problemas, pero la incapacidad de mover las piernas refleja sentimientos de estancamiento o falta de progreso. La profunda angustia indica ansiedad o miedo paralizante ante obstáculos o responsabilidades. Este sueño sugiere una sensación de impotencia o frustración en la vida del soñante, quizás relacionada con desafíos difíciles de superar.	2025-10-23 00:20:38.637	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761178765801.png
bc078964-bd46-4c94-91c8-d333ab949e22	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Huida Desesperada	corro y me quieren atrapar	Correr simboliza la evasión de un problema o conflicto. Sentirse perseguido indica miedo o ansiedad. El sueño refleja una sensación de ser incapaz de enfrentar obstáculos en la vida. El soñante puede estar experimentando angustia y la necesidad de escapar de situaciones estresantes.	2025-10-23 00:27:23.01	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761179194797.png
1a87b818-fa47-4d91-992c-0dfc59fc07a5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El tierno compañero	sonie con un perrito muy gordito y jugueton	El perrito gordo y juguetón simboliza la necesidad de afecto y diversión en tu vida. Representa tu deseo de disfrutar las pequeñas alegrías y de sentirte querido. Puede reflejar una búsqueda de ternura y conexión emocional en un momento de soledad o estrés. Este sueño sugiere la importancia de cuidar tu bienestar emocional y buscar el equilibrio entre la diversión y la responsabilidad.	2025-10-23 01:59:10.293	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761184726001.png
ef88532e-62dd-4d41-bda5-bb5ef89fe5e3	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Gatito Mimoso	sonie con un gatito mimoso y dormilon	El gatito simboliza ternura y cuidado interno. Representa anhelos de afecto y protección. El aspecto dormilón sugiere paz y necesidad de descanso emocional. El soñante puede estar buscando consuelo y calma en medio de preocupaciones diarias.	2025-10-23 02:00:57.794	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761184846472.png
8d60da12-d079-4789-b5f0-cf2814f5abc3	745fdf89-2751-41ee-8554-778ee29f98ae	La presencia de los gatos rojos	soñe con gatos color rojo	Soñar con gatos rojos puede simbolizar pasión, energía y vitalidad. Puede ser un reflejo de tu lado más creativo y emocional, o indicar la necesidad de prestar atención a tus impulsos y deseos más profundos.	2025-10-23 14:08:36.216	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
7b4770e6-205c-41e7-a9da-d104a0a9fae8	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Amistad Fiel	sonie con un perrito	El perrito simboliza lealtad y compañerismo. Este sueño sugiere la presencia de relaciones sólidas y apoyo emocional en tu vida. Puede reflejar tu necesidad de afecto y conexión en un nivel más profundo. Es posible que te sientas reconfortado por la presencia de personas cercanas que te brindan seguridad emocional.	2025-10-23 19:27:07.265	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761247619385.png
ab0c6dbc-8e6d-4801-8f1e-2f7205e62aec	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Libertad en el Vuelo	soñe que volaba	Soñar con volar simboliza la sensación de libertad, el deseo de escapar de limitaciones o responsabilidades. Puede reflejar el anhelo de superar obstáculos o encontrar soluciones creativas. El soñante podría experimentar emociones de liberación y exploración de nuevas posibilidades.	2025-10-23 20:42:07.069	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761252102752.png
d08cc91f-cb30-44b5-8d90-26e182cd5232	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Libertad en el Vuelo	soñe que volaba	El acto de volar simboliza liberación, poder y control sobre tu vida. Puede reflejar deseos de escapar de restricciones o problemas. Este sueño sugiere una búsqueda de autonomía y superación personal. Es posible que el soñante esté experimentando un deseo de mayor libertad y expansión en su vida.	2025-10-23 20:51:25.291	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761252674670.png
4159b7a0-13d5-46cd-9a07-7e7eb1654031	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Frustración Académica	hoy sonie que desaprobaba un parcial	Soñar con desaprobar un parcial simboliza miedo al fracaso y a la decepción, así como inseguridades sobre tus capacidades. Puede reflejar ansiedades por el rendimiento académico o temor a defraudar expectativas propias o ajenas. Este sueño sugiere la necesidad de enfrentar y trabajar en tus temores para recuperar la confianza en ti mismo.	2025-10-23 21:15:23.378	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761254094857.png
1400b18f-5ae2-4e94-bccc-268149bb3fd1	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Impotencia en la Competencia	jugue un partido con los chicos de la facu y no podia correr ni gritar\n	Este sueño refleja sentimientos de impotencia y falta de control en situaciones competitivas. La incapacidad para correr o gritar simboliza la dificultad para expresar tus deseos o necesidades en un entorno social desafiante. Puede indicar miedo al fracaso o a no ser escuchado en tu vida diaria. Es posible que te sientas frustrado por obstáculos que percibes como limitantes en tu desarrollo personal.	2025-10-23 21:19:29.487	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761254316591.png
90c2f690-e407-433f-ae7a-ff6e7834b948	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Ruta Infinita	Un suenio en bucle, un cielo verde con edificios que parecen cajas que se van desvaneciendo. Avanzas por la calle sin final, una y otra vez. No hay personas, los animales estan distorcionados.	El cielo verde y edificios como cajas simbolizan un entorno irreal y opresivo. La repetición de la calle sin fin refleja una sensación de estancamiento y falta de avance. La ausencia de personas y animales distorsionados sugiere soledad y desconexión emocional, quizás relacionadas con sentimientos de alienación y despersonalización.	2025-10-23 21:23:10.933	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761254558319.png
6372a995-68bc-4a13-b92c-c34e105a0ca0	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Huida desesperada	Suenio que corro como si me persiguieran, me tropiezo y no puedo dejar de correr de la desesperacion	El acto de correr simboliza la evasión de un problema o situación incómoda en tu vida. Sentirte perseguido refleja la presión o responsabilidades que sientes que están fuera de tu control. Tropezar y no poder detenerte revela tu sensación de impotencia y ansiedad frente a estos desafíos. Es posible que te sientas abrumado por situaciones que percibes como amenazantes.	2025-10-23 21:27:23.98	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761254799912.png
bad7e96f-df3c-4d19-aaa9-83c2094c9182	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Encuentro Inesperado en el Concierto	estaba saliendo de la puerta de mi casa. me encontre a harry styles y juan roman riquelme tomando mate. harry hablaba en ingles, riquelme en espanol pero igual se entendian. nos fuimos en colectivo los tres hasta river, harry tenia que dar el show y llegaba tarde. llegamos, estuvimos en el backstage y escuchamos el recital, con el mate de por medio	Este sueño sugiere la coexistencia armoniosa de aspectos contrastantes en tu vida, representados por Harry Styles y Juan Román Riquelme. La comunicación fluida entre ellos simboliza una integración exitosa de diferentes partes de tu ser. La prisa de Styles insinúa tu temor a no cumplir expectativas, mientras que el mate representa la calma y la conexión con tus raíces en medio de situaciones exigentes.	2025-10-23 21:33:07.224	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761255162219.png
7e2e62b7-b980-4987-8ef9-b00f6844af50	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La lucha con el guepardo	que peleaba con un guepardo con mi hijo valenkit. le hacia un mataleon 	El guepardo simboliza la rapidez y agresividad, representando tus miedos o desafíos internos. Pelear con él junto a tu hijo podría reflejar una lucha conjunta con aspectos salvajes o instintivos de tu personalidad. El mataleón indica un intento de dominar esa parte agresiva. El sueño sugiere un proceso de confrontación y control de tus impulsos emocionales.	2025-10-23 21:37:58.79	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761255445922.png
bd080954-0ab1-4afe-a67c-ca6f3366ffaf	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El caos desde dos perspectivas	hoy sone que toreto manejaba un colectivo y cocaba com muchos coche y lo podia ver desde adrento y desde afuera 	El sueño sugiere una dualidad en la forma en que enfrentas el caos y los desafíos de la vida, representados por la conducción del colectivo y la observación desde adentro y afuera. Puede reflejar una sensación de control y perspectiva interna y externa sobre tus circunstancias actuales. Es posible que te sientas dividido entre actuar y observar, buscando equilibrar tus roles activos y pasivos en situaciones complicadas.	2025-10-23 22:32:45.189	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	28ef5090-cba6-4e56-8c96-cb8091581dcc	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761258735658.png
5c1144a9-3095-4e2d-a988-7be62d80e993	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Pesadilla de las Puertas	estaba de vacaiones y en mi suenio me di cuenta que estaba soniando, entocneces empece a querer salir y no podia despertarme, frente a mi aperecieron las puertas como las de un hotel comence a entrar a distintas puertas y cada una de ellas me llevaba a una realidad mas terrible, recuerdo pasar por una que parecia un hospital de guerra donde habia muchos bebes en el piso llorando, yo gritaba a mi marido para que me despertara pero el no podia escucharme, finalmete me despierta y comienza a actuar como es el pero me doy cuanta que no estoy realmente en mi habitacion, cuando me di cuenta logre finalmente despesrtame, el mi dijo que. nunca me movi ni hice ningun ruido	El sueño revela una sensación de atrapamiento y desesperación al no poder controlar la propia realidad. Las puertas simbolizan opciones y decisiones en la vida, mostrando miedos internos y ansiedades. La incapacidad de despertar refleja una lucha interna por enfrentar situaciones difíciles. La presencia de un entorno caótico sugiere temores no resueltos y la necesidad de confrontarlos.	2025-10-23 21:45:15.146	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761255872632.png
5e4053b8-18c9-47fa-848c-fb26b9a0d7fc	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explorando Japón en Sueños	hoy sonie que estaba en en un parque de japon	Soñar con estar en un parque en Japón puede simbolizar un deseo de explorar lo desconocido, la búsqueda de paz interior o una necesidad de escapar de la rutina. Puede reflejar un anhelo de aventura o un deseo de conexión con una cultura diferente. El soñante podría estar experimentando un momento de curiosidad y apertura hacia nuevas experiencias.	2025-10-23 21:50:03.854	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761256102803.png
532429ed-f4ec-4173-952b-40b9360c84fa	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Encuentro en Otra Vida	Sonie que me encontraba con una persona en otra vida...	El encuentro con una persona en otra vida simboliza la conexión profunda con aspectos no resueltos del pasado. Puede reflejar deseos de reconciliación o comprensión de relaciones pasadas. Este sueño sugiere una búsqueda interna de sentido y la necesidad de resolver conflictos emocionales pendientes.	2025-10-23 21:56:32.101	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	28ef5090-cba6-4e56-8c96-cb8091581dcc	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761256542636.png
5c41f8ef-12d9-4c9d-89be-e52b60b475a5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Pérdida de la Identidad	Hoy sone que se me caian todos los dientes	Soñar con la caída de los dientes puede representar temor al envejecimiento o a la pérdida de atractivo físico. También puede simbolizar sentimientos de vulnerabilidad o falta de control en la vida. Es posible que el soñante esté experimentando ansiedad o inseguridad en su día a día, reflejando un miedo a perder su identidad o su poder personal.	2025-10-23 22:02:22.309	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761256910224.png
1ccf99b4-38a1-48bc-8c82-6a559ee23a1e	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Inmersión Incontrolable	sonie que me meto al mar y empiezo a hundirme, intento salir y no puedo	El mar simboliza lo desconocido o abrumador en tu vida. El hundirte representa la sensación de estar perdiendo el control o siendo abrumado por emociones o situaciones. La lucha por salir refleja tu deseo de superar estos desafíos pero sientes que te resulta imposible en este momento. Este sueño revela tu temor a ser arrastrado por circunstancias que sientes que no puedes manejar.	2025-10-23 22:05:22.649	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761257089518.png
416419f7-47f2-48f4-9fb0-bddf3aaf4747	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Caída sin Control	suenio que voy corriendo, me caigo y no puedo frenar la caida, es muy recurrente	Este sueño recurrente sugiere un temor subconsciente a perder el control en tu vida. La caída simboliza la sensación de estar desbordado por situaciones que no puedes manejar. Puede reflejar inseguridades o miedos relacionados con la falta de dirección o poder sobre tus circunstancias. Es crucial explorar qué aspectos de tu vida te hacen sentir impotente para abordar estos desafíos emocionales.	2025-10-23 22:07:53.084	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761257237446.png
19474732-0e63-4dd4-b5dc-d96e00cfd86c	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explorando lo Desconocido	estaba caminando en el desierto y luego aparecio un cohete y  me llevo a marte donde comi hamburguesa	El desierto simboliza la sensación de soledad o aislamiento. El cohete representaría un deseo de explorar lo desconocido y buscar nuevas aventuras. Comer una hamburguesa en Marte sugiere la necesidad de encontrar comodidad en entornos inusuales. Este sueño puede reflejar un anhelo de escapar de la rutina y buscar experiencias emocionantes.	2025-10-23 22:13:19.128	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761257571380.png
60f0492d-96da-493b-afb7-fed261908199	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Pequeña Estatura del Ser	sonie que era un hombre muy muy bajo, que ademas de esto tenia un solo diente. Ese diente era tan grande que ocupaba todo mi pequenio cuerpo. todos me querian igualmente	El sueño sugiere sentimientos de inferioridad y vulnerabilidad, representados por la baja estatura y el único diente desproporcionadamente grande. A pesar de estas inseguridades, el hecho de que todos te quisieran igualmente indica una aceptación y amor incondicional por parte de los demás. Es posible que el soñante esté lidiando con una baja autoestima y la necesidad de sentirse valorado y aceptado.	2025-10-23 22:20:04.331	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761257983918.png
21e4ffb3-f50f-40ef-9911-0629680f87c7	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Perdido en el Bosque	sonie que iba por el bosque y me perdia	Perderse en un bosque simboliza la sensación de confusión o desorientación en la vida. Puede reflejar miedo a lo desconocido o a tomar decisiones importantes. El soñante puede sentirse abrumado por situaciones actuales que lo hacen perder el rumbo.	2025-10-23 22:21:58.489	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761258109285.png
9a7d74d4-acb0-4715-8048-e141d5f60eca	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Oscuridad en la Cancha de Voley	jugamos voley con  mi amiga luna en una cancha a oscuras mientras en cada juego se oscurese mas 	Este sueño sugiere que quizás te sientes desafiado por situaciones inesperadas o desconocidas en tu relación con tu amiga Luna. La oscuridad simboliza la falta de claridad o comprensión en esta dinámica, lo que puede generar ansiedad o temor. Es posible que te preocupen los cambios repentinos o la dificultad para ver con claridad en tu relación con Luna, lo que puede llevarte a sentirte inseguro o perdido emocionalmente.	2025-10-23 22:27:56.803	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761258452664.png
58de004c-e40b-444f-85f4-16cb285adb81	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Soledad Familiar en el Cielo	sonie que estaba solito y toda mi familia se fue al cielo	El sueño sugiere sentimientos de abandono y pérdida, simbolizados por la soledad experimentada al quedarte solo mientras tu familia se va al cielo. Puede reflejar temores de separación o de no ser capaz de estar junto a tus seres queridos. Es posible que te sientas desconectado emocionalmente o que tengas miedo a la pérdida. Es crucial explorar tus lazos familiares y tu necesidad de conexión emocional para encontrar equilibrio y seguridad interna.	2025-10-23 22:35:51.727	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	28ef5090-cba6-4e56-8c96-cb8091581dcc	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761258914445.png
d8be0eb6-fef4-446b-b525-36f471c429ac	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Preocupación por llegar tarde al trabajo	ientras suenio que me preocupo por quedarme dormida y no llego a trabajar	El temor a quedarse dormido simboliza el miedo al fracaso o la incapacidad para cumplir con responsabilidades. La preocupación por llegar tarde revela ansiedad o presión por el rendimiento laboral. El sueño refleja posibles conflictos internos entre el deseo de éxito y el temor al fracaso.	2025-10-23 22:40:48.813	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761259173398.png
1d1da5c1-a3c6-47a5-9c97-c4b7af1a5dcc	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Desafíos en el Aula	suenio que estoy en un aula dando clases y mis alumnos nunca estudiarn, hacen preguntas porque no miraron el material y no me salen las palabras.	Este sueño refleja sentimientos de frustración e incompetencia. El aula representa tu vida profesional, donde buscas guiar a otros. El hecho de que los alumnos no estudien simboliza la falta de compromiso o interés en seguir tus enseñanzas. La dificultad para expresarte denota ansiedad y temor a no ser comprendido o valorado en tu rol de liderazgo.	2025-10-23 22:43:51.979	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761259408849.png
740076c0-6b9f-4ccf-ac97-43856661d040	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Libertad en el Vuelo	estoy volando	Soñar con volar simboliza libertad, escape de limitaciones y deseos de superación. Puede reflejar la necesidad de liberarse de restricciones emocionales o situaciones opresivas. El sueño puede indicar un anhelo de autonomía y exploración personal, revelando un deseo profundo de alcanzar metas o aspiraciones.	2025-10-23 22:47:52.176	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761259650534.png
e3e7c548-2cb5-4483-902c-edd072dc6562	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Las copas doradas efímeras	Suenio con un naufragio, estoy bajo la tormenta y luego de una noche de ahogo me encuentro cerca de una costa, se hizo de dia y estoy exhausto, al acercarme a la costa encuentro en la playa dos copas de vidrio. las copas de vidrio estan bordeadas con una pintura dorada y al intentar agarrarlas se rompen y se transforman en arena que se me escurre de los dedos. al ver la situacion me enfurezco por no poder haber sostenido las copas en mi mano.	El naufragio simboliza un momento de crisis o pérdida en tu vida. Las copas de vidrio representan la fragilidad y la ilusión de logros o metas. La frustración al verlas romperse y convertirse en arena refleja tu lucha con la impermanencia y la dificultad para aferrarte a lo que deseas.	2025-10-23 22:52:06.244	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761259902146.png
203933d3-2b09-48ba-8a2a-e27778cbf1b5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Futuro Incierto	me levanto y vivo en el futuro. No existen las enfermedas ni la, pero me levanto enferma. Vivmos en colmenas, y todo esta hecho de organos artificiales. cuando voy al hospital, mi enfermedad no tiene cura, asi que me clonan para que mi clon vaya con mi familia, y yo me quedo en el hospital para que encuenten la cura. resulta que en realidad, nada es artifcial, y a la gente enferma en los hospitales la, y los organos se usan para las fabricas.	Este sueño refleja tu temor a la enfermedad y a la muerte, así como tu ansiedad por el futuro desconocido. Las colmenas y órganos artificiales representan una sociedad deshumanizada y distópica. La clonación simboliza la búsqueda de soluciones extremas ante la impotencia, mientras que la revelación final sugiere una realidad más cruel de lo que se percibía.	2025-10-23 22:58:48.894	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761260310595.png
3e4fc5c4-e2ba-4159-bd27-84471aaa7064	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Ausencia Paterna	suenio con mi papa que ya no esta	Soñar con un padre fallecido simboliza la necesidad de guía, protección o consejo que ya no se puede obtener. Puede reflejar un deseo de reconciliación o cierre emocional. El soñante podría experimentar un conflicto interno relacionado con la pérdida o la falta de figura paterna en su vida.	2025-10-23 23:01:08.401	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	28ef5090-cba6-4e56-8c96-cb8091581dcc	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761260442235.png
82f5affb-158d-452f-91bb-db36f66778f2	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Sombra del Despertar	un zombi me sbsorvia el alma mientras dormia y yo despierta no podia moverme pero veia como lo hacia 	El zombi simboliza tus miedos o traumas internos que te consumen, reflejando una sensación de incapacidad para defender tu identidad o control sobre tu vida. La parálisis al despertar sugiere una lucha con la realidad o la sensación de estar atrapado en una situación angustiante. Este sueño indica un conflicto interno profundo y la necesidad de enfrentar y superar tus temores para recuperar tu poder personal.	2025-10-23 23:06:11.204	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761260754145.png
bcf58cd6-1902-4fe4-94f7-ec99fa0aa912	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El viaje al infierno de Piccolo	cuando tenia 5 anios veia mucho dragon ball, el problema es que una noche estaba durmeindo con mis papas y sonie que picolo me chupaba desde la iglesia al infierno y me cortaba en pedacitos. Me desperte asustado y nunca mas volvi a ver dragon ball	El personaje de Piccolo simboliza tu lado oscuro o temores internos que te aterrorizan. El acto de ser chupado y cortado en pedazos representa una sensación de pérdida de control y vulnerabilidad. El hecho de nunca más querer ver Dragon Ball sugiere un intento de evitar confrontar tus miedos más profundos.	2025-10-23 23:08:47.448	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761260915104.png
86668a22-059f-4274-835c-b9a1e27e0673	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Mensaje de Fracaso	una vez sone que el profe me escribia al privado que avise a mi equipo que dejaramos de trabajar porque ya estaba , no importaba que hicieramos no ibamos a llegar y yo no sabia como avisarle a los chicos que habiamos desaprobado	Este sueño refleja tu temor al fracaso y a decepcionar a los demás. El profesor simboliza la autoridad y la evaluación externa, mientras que la incapacidad para comunicar el mensaje a tu equipo revela dificultades para expresar tus preocupaciones. Te sientes abrumado por la responsabilidad de comunicar malas noticias y por no cumplir con las expectativas.	2025-10-23 23:12:26.388	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761261116431.png
90781451-3511-47f8-a303-4d0c0d073c70	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Casa en el Bosque	siempre suenio que estoy en una casa grande en un bosque, y cuando quiero ver como es el lugar por fuera nunca encuentro la salida y siempre vuelvo a la casa de ese bosque\n	Estar atrapado en una casa grande en un bosque simboliza sentirse atrapado en tu propia mente o emociones, incapaz de escapar o encontrar claridad. La incapacidad para salir refleja una sensación de estancamiento o falta de progreso en la vida. El ciclo de regresar a la casa sugiere un patrón recurrente de enfrentarse a los mismos problemas o situaciones sin resolver.	2025-10-23 23:16:56.73	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761261402659.png
4b9a3478-10f9-4a76-ab20-1f4381f452f5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Invasión de Criaturas Nocturnas	estaba acostada en la cama y empezaron a caer insectos, aranias y serpientes del techo\n	Este sueño sugiere una sensación de invasión y vulnerabilidad. Los insectos representan pensamientos intrusivos, las arañas pueden simbolizar manipulaciones o engaños, y las serpientes denotan traición o conflicto interno. El soñante podría estar experimentando ansiedad, miedo a la traición o sensación de pérdida de control en su vida.	2025-10-23 23:20:09.288	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761261593426.png
9f1606cd-9f18-4a4e-8f8a-c4b1d7b3a7c2	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Consecuencias Inesperadas	encontre un gatito, lo entre a casa con mis gatitos y rompia todo	Encontrar un gatito simboliza un descubrimiento de aspectos tiernos o vulnerables de tu ser. Al llevarlo a casa con tus gatitos, representas la integración de estas partes en tu vida cotidiana. El acto de romper todo puede reflejar ansiedades sobre la armonía en tu entorno o miedo a perder el control. Es posible que te sientas abrumado por la responsabilidad de cuidar de tus aspectos más sensibles.	2025-10-23 23:22:53.433	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761261732422.png
4d04ae7d-ddcf-4de5-ae72-cbe2cb5ea365	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Viaje con la Compañera de Fútbol	viaje en auto y habia uba compa;era mia de futbol\n	El viaje en auto simboliza el camino de la vida y la compañera de fútbol representa camaradería y trabajo en equipo. Este sueño sugiere un deseo de conexión social y apoyo mutuo en situaciones retadoras. El soñante puede sentirse en busca de solidaridad y amistad para superar desafíos presentes.	2025-10-23 23:26:52.487	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761261986712.png
2d41d568-aa58-4e69-8569-6945e6ba8a17	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Encuentro con el Saltamontes	sonie que encontraba un saltamonte en mi cama, y luego lo encontre en mi cama de verdad	Encontrar un saltamontes simboliza intuición y sabiduría interior. Este insecto puede representar la necesidad de prestar atención a detalles pasados por alto. El hallazgo en la cama sugiere una conexión cercana con tu subconsciente y emociones profundas. Es posible que te enfrentes a una revelación personal o a la necesidad de explorar tu mundo interno.	2025-10-23 23:31:51.178	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761262267651.png
c9c67a8d-420b-4569-b29c-9397e70a0b41	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Herida Sanada	sonie con un brazo herido de un nene, y dije que habia que llevarlo al hospital, luego aparecio con la herida cosida	El brazo herido simboliza un dolor emocional o trauma pasado en la niñez. El acto de llevar al niño al hospital representa la necesidad de atención y cuidado para sanar estas heridas internas. Ver la herida cosida sugiere un proceso de curación en curso y la posibilidad de superar el dolor con apoyo y tratamiento.	2025-10-23 23:36:21.096	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761262547675.png
f287b195-ed0b-4a16-8a4c-e11d75a193b2	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Choque Despertador	hoy sonie que manejaba una camioneta y chocaba, cuando choco siempre me despierto	El acto de manejar simboliza el control sobre la dirección de tu vida. Chocar representa obstáculos o conflictos que te impiden avanzar. El despertar al chocar sugiere una evasión de enfrentar esos desafíos. Este sueño refleja tu temor a fracasar o afrontar situaciones complicadas, posiblemente asociadas con miedos internos o inseguridades.	2025-10-23 23:40:00.459	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761262782544.png
116dcfd2-b2eb-406b-948c-cb8a56050251	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Laberinto Naranja y Tigre	estaba en una habitacion naranja gigante, lleno de una especie de laberinto tridimensional hecho de tuberias transparentes, yo estaba ahi atrapado y por algun lado aparecio un tigre que me empezo a perseguir, despues ya me desperte porque bueno era una pesadilla viste	El color naranja simboliza la creatividad y la vitalidad, mientras que el laberinto representa la sensación de estar atrapado en una situación compleja. La presencia del tigre sugiere miedo, peligro o impulsos agresivos que persiguen al soñante. Este sueño refleja posibles conflictos internos, la sensación de estar atrapado en situaciones amenazantes y la necesidad de enfrentar miedos internos.	2025-10-23 23:45:06.299	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761263062467.png
1d91a616-c731-4f30-a5a5-d93004ba91e9	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Libertad sobre las olas	volar sobre el oceano	Soñar con volar sobre el océano simboliza la búsqueda de libertad y expansión emocional. Puede reflejar deseos de explorar lo desconocido y superar barreras emocionales. El soñante podría estar experimentando un deseo profundo de escapar de limitaciones o responsabilidades en su vida diaria.	2025-10-23 23:50:59.98	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761263423476.png
6812aa10-7b16-48e9-82fd-9cc58f9ffd5f	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Reencuentro con Iniaky	sonie con Iniaky, mi gatito que fallecio hace 4 anios, jugaba con el y le daba mimitos, un suenio muy agradable en el que recorde el carinio que nos teniamos	El gatito fallecido simboliza tu conexión emocional con el pasado y la nostalgia por lo perdido. El acto de jugar y dar cariño refleja la necesidad de reconfortarte y revivir momentos felices. Este sueño sugiere una búsqueda de consuelo y la importancia de recordar y apreciar los lazos afectivos.	2025-10-23 23:56:02.357	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761263736630.png
00811926-70f2-49c8-bb02-b1e54e473c01	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Desafío Interno Mortal	sonie que mataba a Milei	Soñar con matar a Milei simboliza el deseo de eliminar una parte de ti mismo asociada con la rebeldía o la oposición. Puede reflejar un conflicto interno entre tus ideales y tu necesidad de adaptarte. Este sueño sugiere una lucha interna por encontrar equilibrio entre la individualidad y la conformidad social.	2025-10-24 00:01:47.899	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761264090983.png
94ac60b2-c955-457c-b08a-454a709ea0c3	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Reconfiguración del Hogar Interior	sonie que estaba en un lugar similar a mi barrio pero con la estructura cambiada\n	El cambio en la estructura del barrio refleja un deseo de transformación interior y búsqueda de nuevas perspectivas. Puede indicar una necesidad de explorar partes desconocidas de ti mismo. Las emociones asociadas pueden ser curiosidad, inquietud o anhelo de cambio. Este sueño invita a reflexionar sobre tu disposición para adaptarte a lo desconocido y crecer emocionalmente.	2025-10-24 00:22:28.936	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	28ef5090-cba6-4e56-8c96-cb8091581dcc	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761265306881.png
86cce383-ee54-4680-82a0-07a7110c0289	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Belleza Interna Revelada	sonie con algo hermoso	Este sueño sugiere que el soñante está explorando su propia belleza interna y potencial. La belleza simboliza autoaceptación y aprecio por uno mismo. Puede reflejar un deseo de crecimiento personal y confianza en sus capacidades. El sueño invita a reconocer la belleza interior que posee, nutriendo una mayor autoestima y satisfacción personal.	2025-10-24 18:32:32.434	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761330745572.png
a41026c6-f48f-414e-a8e4-4aca75b49b07	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explorando la Belleza Nocturna	hola sonie con algo lindo	Este sueño puede reflejar un anhelo de belleza y armonía en la vida del soñante. La experiencia de algo 'lindo' sugiere un deseo de positividad y gratificación emocional. Es posible que el soñante busque alegría y satisfacción en medio de su rutina diaria, anhelando momentos de felicidad y tranquilidad.	2025-10-24 20:54:29.3	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761339248993.png
33ccdc54-653c-411f-a8ce-1a5941b52085	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Exploración Cósmica en Casa	sonie que estaba en la terraza de mi casa y habia muchos gatitos callejeros color naranja y en el cielo se veian ovnis y los planetas muy grandes	Los gatitos callejeros representan tu deseo de libertad y espontaneidad, mientras que los ovnis y planetas simbolizan lo desconocido y la búsqueda de respuestas a preguntas profundas. Este sueño sugiere un anhelo de explorar nuevas posibilidades y expandir tu mente. Tu estado emocional puede reflejar curiosidad y anhelo de aventura.	2025-10-24 20:57:13.567	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761339400941.png
3fa070a2-8d79-420f-9e9e-be8d410e14d1	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Lluvia de Meteoritos Rojos	sone que venian meteoritos rojos 	Los meteoritos rojos simbolizan peligro inminente o situaciones fuera de control. El color rojo refleja pasión, ira o intensidad emocional. El soñante podría estar experimentando ansiedad o temor ante eventos que percibe como amenazantes, sintiendo una falta de control sobre su entorno. Es crucial que el soñante reflexione sobre qué aspectos de su vida le generan esta sensación de vulnerabilidad.	2025-10-24 21:00:02.773	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761339587840.png
ee93b1ca-c9c2-4d68-bb78-9debeb3b77f9	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Caída sin Fin	Suenio que me estoy cayendo al vacio\n	Soñar con caer al vacío simboliza una sensación de falta de control en la vida o miedo al fracaso. Puede reflejar inseguridades profundas o ansiedades latentes. La experiencia de caída suele estar vinculada con emociones de vulnerabilidad y pérdida de estabilidad emocional.	2025-10-24 21:09:30.583	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761340141338.png
cac3d285-4d8a-4b9c-9aab-13e860e3d92f	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Fortuna Anhelada	hoy sone que ganaba la loteria\n	Soñar con ganar la lotería simboliza anhelos de éxito, poder y liberación de preocupaciones financieras. Puede reflejar deseos de controlar la vida o sentirse valorado. El sueño podría indicar la necesidad de reconocer tus talentos y aspiraciones para lograr la realización personal.	2025-10-24 21:18:16.225	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761340669388.png
2d000c95-fc2d-4f89-a4bb-83ca2dc6b4d4	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El viaje hacia la felicidad	estaba como pasajero en un autobus lleno de personas y repentinamente aparece mi hermano y me lleva volando hacia un arcoiris guiandome hacia una playa donde estaba mi familia	El autobús lleno simboliza la vida cotidiana y la multitud de responsabilidades. El hermano representa una guía o apoyo en momentos de cambio. El arcoíris y la playa reflejan la esperanza, la armonía y la conexión familiar. Este sueño sugiere un deseo de escapar de la rutina hacia un lugar de paz y unión emocional.	2025-10-24 21:26:22.926	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761341139916.png
bfc66b81-a6a0-4249-a2c2-323b89758ff9	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Sapo en la Esquina	un sapo en una esquina de una habitacion. el sapo estaba quieto y era inofensivo 	El sapo en la esquina simboliza sentimientos reprimidos o aspectos oscuros de la psique. Su quietud e inofensividad pueden representar una sensación de estancamiento emocional o miedo a confrontar lo desconocido. El soñante puede estar experimentando una falta de movimiento o evolución en su vida emocional, invitándolo a explorar y aceptar estas partes de sí mismo.	2025-10-24 21:30:44.135	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761341367202.png
7d4fd436-c595-478b-a470-4768612aecc5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Atrapado por el Oso	hoy sonie que me atrapaba un oso	Soñar con ser atrapado por un oso simboliza el enfrentamiento con miedos internos o situaciones amenazantes en la vida real. Puede representar sentimientos de vulnerabilidad, ansiedad o falta de control. Es posible que el soñante esté experimentando un momento de gran presión o enfrentando desafíos abrumadores.	2025-10-24 21:33:25.406	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761341554083.png
05fd4e93-590b-4930-9724-88da7f3f78ae	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Choque y Renovación	sonie que chocaba con el auto y se abria la puerta de una casa justo el dia que renove el seguro	El choque con el auto simboliza enfrentar obstáculos o conflictos en la vida, mientras que la puerta de la casa abriéndose representa nuevas oportunidades o cambios. La renovación del seguro sugiere una necesidad de protección o seguridad en medio de cambios. El sueño refleja posibles sentimientos de enfrentamiento, adaptación a cambios y búsqueda de seguridad en situaciones desafiantes.	2025-10-24 21:36:42.011	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761341772702.png
de5e5708-2f4d-4eb9-a5e8-2c379ff9d1d2	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Sueño de la Lentitud Gatuna	Estoy en una habitacion, de repemte todo se pone mas lento, y comienzan a aparecer gatos, cuantos mas aparecen mas lento se pone todo. Se me acercan, y en cuanto me mueren, me despierto.	Los gatos simbolizan la intuición y la feminidad. La lentitud representa una sensación de estar atrapado o restringido en la vida. El acto de ser mordido por los gatos puede indicar miedos o conflictos internos que te impiden avanzar, despertando una necesidad de atención a aspectos emocionales descuidados.	2025-10-24 21:41:08.209	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761342048329.png
d2db5b1f-c579-4e47-a0b6-134da98a3b87	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Atrapado entre Payasos	Estaba en una plaza con muchos payasos, y cuando queria salir no podia porque todo estaba cerrado con paredes muy altas.	Los payasos simbolizan la diversión superficial y la máscara social, mientras que las paredes altas representan barreras autoimpuestas. El sueño sugiere la sensación de estar atrapado en un entorno de falsedad y dificultad para escapar de la presión social. Revela un conflicto interno entre la autenticidad y la necesidad de encajar. El soñante puede sentirse sofocado por expectativas externas y anhelar libertad emocional.	2025-10-24 21:46:25.962	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761342344449.png
9ffa3dc4-ff7c-4ca5-ae9c-d97be575d4fb	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Inseguridad Capilar	Sonie que estaba en mi casa y me tocaba el pelo y se me empezo a caer y me acuerdo que en el suenio me preocupe como si hubiera pasado de verdad.	El pelo simboliza la identidad y la autoestima. Su caída puede representar inseguridades o temores de perder el control sobre quién eres. La preocupación en el sueño revela ansiedad por la percepción de uno mismo. Es posible que exista un conflicto interno respecto a la imagen personal y la aceptación.	2025-10-24 21:51:08.06	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761342642224.png
9efac0ae-e1df-40a5-930b-2812008fb514	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Confusión Académica	Sonie con la facultad, estaba estudiando matematica	Soñar con estudiar matemáticas en la facultad sugiere un sentimiento de presión académica o inseguridad en tus habilidades intelectuales. Puede reflejar un deseo de superarte o el temor al fracaso. Es probable que el soñante esté experimentando estrés relacionado con su rendimiento académico o con la toma de decisiones importantes sobre su futuro profesional.	2025-10-24 21:58:18.236	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761343081201.png
7bb3bf47-b402-4f3c-9848-94747549cc51	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Caos y Confusión en el Hogar	En la entrada de mi casa estaba mi abuelo que estaba muy triste,  luego yo lo consolaba por que estaba muy mla. Al subir a mi casa veia un caos desde el balcon, kluego se veia mucho fuego y robos, y una ambulacnia con payasos adentro y el camion de la ambulancia era hueco, no tenia puerta ni parte delantera, tenia 20 anios	El abuelo triste representa la pérdida de sabiduría y guía en tu vida. El caos y el fuego simbolizan conflictos internos y emociones descontroladas. La presencia de payasos en la ambulancia sugiere una falta de seriedad ante situaciones críticas. Este sueño refleja tu angustia y ansiedad por la falta de dirección y estabilidad emocional.	2025-10-24 22:03:33.861	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761343383300.png
a2910c37-b1a3-4b4a-9032-7e8ac194554c	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Desaprobando el Examen	Mi sueno sucede en mi colegio del secundario, yo me levanto tarde para ir a un examen de ingles. Al llegar, olvide todo lo que habia estudiado, me empece a preocupar y termine desaprobando con un 2. La angustia y la preocupacion me invadieron, hasta que desperte y reconoci que todo eso habia sido una pesadillla para mi agrado.	El colegio secundario simboliza presión y responsabilidad. Olvidar lo estudiado refleja inseguridades y temor al fracaso. La angustia y preocupación revelan miedo al juicio de otros y autoexigencia. El alivio al despertar sugiere un deseo de liberación de esas presiones internas.	2025-10-24 22:09:30.157	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761343753676.png
668351c0-d00b-418f-af17-4da981da962e	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Anuncio de Boda	sone que un companero me decia que se casaba\n	Soñar con un compañero anunciando su boda puede reflejar deseos ocultos de compromiso o estabilidad en tu vida. Este sueño podría revelar anhelos de unión emocional o temores sobre tus propias relaciones. Es importante reflexionar sobre la manera en que te sientes al respecto, ya que podría revelar tu disposición o resistencia hacia el compromiso.	2025-10-24 22:14:47.181	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761344033019.png
b9c64b7c-6f9f-439b-a1f3-c25ec53c88a7	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Rescate en el Tanque	en un tanque de agua, se cayo la gatita, yo en el momento atine a agarrarla y me desperte	El tanque de agua simboliza tus emociones reprimidas o situaciones difíciles. La gatita representa tu parte vulnerable o tu instinto de protección. Al rescatarla, muestras tu deseo de cuidar y salvaguardar a quienes te importan, aunque también revela tu miedo a perder lo que amas. Tu reacción instintiva indica tu capacidad para enfrentar desafíos emocionales.	2025-10-24 22:19:21.487	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761344305328.png
05597fa1-f333-444c-bbde-e2376eb2089a	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Desaprobando la Web	sone que desaprobaba web	Soñar con desaprobar una web puede reflejar inseguridades o dudas sobre tus habilidades o conocimientos en un ámbito digital. Puede simbolizar el temor a no ser capaz de cumplir con las expectativas propias o ajenas en el entorno tecnológico. Este sueño sugiere la necesidad de enfrentar y superar esos temores internos para sentirte más seguro y competente en tu vida digital.	2025-10-24 22:23:23.804	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761344582519.png
02579672-1fb7-4a44-8a14-97c2b433cde8	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explorando la Feria de Ciencias	hoy sonie que iba a una feria con mi hermana y era de ciencias	La feria de ciencias simboliza el deseo de explorar y comprender el mundo que te rodea. Tu hermana representa una conexión emocional y apoyo en esta búsqueda de conocimiento. Este sueño sugiere un interés por la racionalidad y el descubrimiento, así como una necesidad de compartir esta pasión con alguien cercano. Es posible que estés experimentando un período de curiosidad intelectual y colaboración emocional en tu vida.	2025-10-24 22:27:53.14	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761344848204.png
19e3fc13-f0f1-4831-ac80-760352e9f611	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Dedos Caídos	Sonie que se me callo los dedos\n	Soñar con que se caen los dedos puede reflejar una sensación de pérdida de control o habilidades. Los dedos simbolizan destreza y capacidad de acción, por lo que su caída puede indicar miedo a perder la capacidad de hacer algo importante. Este sueño sugiere posibles sentimientos de impotencia o inseguridad en el soñante, quien podría enfrentar situaciones que desafían su autoconfianza y destreza.	2025-10-24 22:31:41.427	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761345084270.png
3b195501-a76f-4c97-9715-6d359853ea0a	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Caída Pública Humillante	hoy sonie que me caia en la calle y se reian	Este sueño sugiere sentimientos de vulnerabilidad y vergüenza. Caer en público simboliza temores a ser juzgado o ridiculizado. Las risas podrían representar una sensación de falta de control sobre la imagen que proyectas. Es posible que te preocupe la opinión de los demás y temas mostrar tus debilidades.	2025-10-24 22:37:09.921	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761345420223.png
0e48fb7c-492f-478c-ae29-0ae94e00a8b5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Secuestro en el Barrio Desconocido	Barrio desconocido, una virgen, estaba con alguien mas. Entran 3 personas con armas a raptar a mi acompanante, a mi no me ven.El barrio desconocido representa la exploración de aspectos desconocidos de ti mismo. La virgen simboliza pureza o inocencia, mientras que las personas armadas reflejan amenazas externas o conflictos internos. El hecho de que no te vean puede indicar sentimientos de invisibilidad o falta de reconocimiento en situaciones peligrosas. Es posible que estés enfrentando miedos o peligros que no son evidentes para los demás.	2025-10-24 22:41:05.352	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761345644020.png
a5422111-6bd1-409b-b3f2-2343fa3cab82	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Invasión Venenosa Nocturna	sone que habia escorpiones en mi cama	Soñar con escorpiones en la cama simboliza sentimientos de traición o peligro acechando en tu vida íntima. Puede representar miedos ocultos o la presencia de personas o situaciones tóxicas en tu entorno cercano. Este sueño sugiere la necesidad de estar alerta ante posibles amenazas emocionales o conflictos que puedan surgir en tus relaciones más cercanas.	2025-10-24 22:45:11.412	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761345901330.png
b231215b-4282-48c9-a76c-df2f5f0a99b7	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La fragilidad de la imagen personal	sonie que se me caian los dientes\n	Soñar con la caída de los dientes simboliza inseguridad en la imagen personal o miedo a perder el control sobre aspectos importantes de la vida. Puede reflejar temor a envejecer, a no ser aceptado o a perder la capacidad de comunicación. Es posible que el soñante esté experimentando ansiedad o baja autoestima en su vida diaria.2025-10-24 22:49:15.27	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761346076955.png
cf177b98-51cb-4b6e-a837-696c9feec936	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La travesía del dinosaurio futbolero	Sonie que iba arriba de un dinosaurio con la camiseta de Boca andando por autipista	El dinosaurio simboliza la fuerza primordial y el instinto, mientras que la camiseta de Boca representa la identidad y la pasión. El estar en una autopista refleja un camino o trayecto en la vida. Este sueño sugiere que estás en un viaje interno hacia la autenticidad y el empoderamiento, fusionando tu esencia con tus pasiones y enfrentando desafíos con determinación.	2025-10-24 22:52:27.136	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761346332797.png
01b34426-0c53-4a44-8d92-670e5caa0351	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Vínculos Familiares Fortalecidos	viaje en familia	El viaje en familia simboliza la conexión emocional y la unidad familiar. Los elementos principales representan la importancia de la cohesión y el apoyo mutuo. El soñante puede estar experimentando un deseo profundo de cercanía y armonía en sus relaciones personales, buscando seguridad y pertenencia.	2025-10-24 22:56:15.461	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761346566479.png
7b4e1328-109f-4aed-b844-d4f80eb51497	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Batalla con Capitán Cavernícola	sonie que el dibujito capitan cavernicola me ataco y tuvimos una lucha terrible, donde le arranco el brazo, pero el me seguia atacandoEste sueño sugiere que estás enfrentando tus impulsos primitivos o agresivos. La lucha con Capitán Cavernícola simboliza un conflicto interno entre tu lado salvaje y tu racionalidad. El hecho de arrancarle el brazo pero que siga atacándote refleja una lucha interna persistente y el desafío de controlar tus instintos más primitivos.	2025-10-24 23:00:06.986	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761346783894.png
27355020-b87e-42ee-a549-660faccf6cf5	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Sombra y Desorden	Sonie que me despertaba en mi habitacion y veia una sombra pasar por la ventana del lado de afuera, luego senti un escalofrio por todo el cuerpo y cuando me despertaba (seguia soniando) estaba toda mi habitacion desordenada y los relojes de la casa parados. Luego me desperte. Que significa esto	La sombra pasando por la ventana simboliza ansiedades o miedos latentes. El escalofrío refleja una sensación de amenaza o inseguridad. El desorden en tu habitación y los relojes parados representan un sentimiento de pérdida de control y desorientación en tu vida. Este sueño sugiere que puedes estar experimentando angustia por un desequilibrio emocional o cambios inesperados en tu entorno.	2025-10-24 23:05:43.056	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761347105087.png
404fe327-f9c1-434c-b6d8-c3f92510bba3	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Explosión en Minecraft	sonie que estoy en minecraft, me encontre con un creeper y exploto y ahi me desperte	El encuentro con el creeper simboliza una amenaza inesperada en tu vida. La explosión representa la liberación de tensiones o emociones reprimidas que pueden causar daño. Este sueño refleja posibles miedos ocultos o situaciones explosivas que te perturban, instándote a enfrentar y gestionar tus conflictos internos.	2025-10-24 23:23:27.747	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761348163393.png
b7608791-4862-4d1c-8fa5-8a6745f49184	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Traición en la Relación	Sonie que mi pareja me enganiaba	Soñar que tu pareja te engaña suele reflejar inseguridades o falta de confianza en la relación. Puede revelar miedos internos de abandono o pérdida. Es importante explorar si existen señales de desconfianza reales o si es un reflejo de tus propias inseguridades. El sueño invita a reflexionar sobre la comunicación y la confianza en la pareja.	2025-10-24 23:28:13.399	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761348476845.png
fc3c023f-4622-44d5-afd7-63fdb223d76a	c4efd970-b52b-4db8-8fb4-fa293fcc9517	Traición Mortal	sonie que mate a mi comapaniero\n	Este sueño sugiere sentimientos de traición o conflicto con tu compañero en la vida real. Matarlo simbólicamente puede representar un deseo de terminar con esa relación o aspecto de tu vida que te está causando malestar. Puede reflejar una necesidad de liberarte de una carga emocional o de tomar decisiones drásticas para tu propio bienestar.	2025-10-24 23:36:16.618	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	889e4b20-3e43-4b4a-b6f0-22733ca0f43d	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761348934685.png
e61ca7c9-f82d-48a8-a573-ad46221075dd	c4efd970-b52b-4db8-8fb4-fa293fcc9517	La Belleza Canina	hola hoy sonie con un perro muy bonito	El perro bonito en tu sueño simboliza lealtad y amistad. Puede representar la necesidad de conexiones afectivas o la presencia de un amigo fiel en tu vida. Este sueño sugiere un deseo subyacente de compañía o apoyo emocional. Es posible que te sientas en búsqueda de relaciones significativas o reconfortantes.	2025-10-26 00:17:20.212	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761437832612.png
9621e4c5-fee8-4a59-9aac-8128a35c76ec	c4efd970-b52b-4db8-8fb4-fa293fcc9517	El Dorado Celestial	sonie con el cielo.. una ciudad de oro y mansiones hermosas	Soñar con un cielo dorado y mansiones hermosas simboliza deseos de prosperidad, éxito y abundancia material. Estos elementos reflejan la búsqueda de un ideal de vida lujosa y plena. El soñante puede sentirse insatisfecho con su situación actual y anhelar un cambio hacia una vida más próspera y satisfactoria.	2025-10-28 07:14:31.949	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	https://xjhgkjxtuumaxbbgujdf.supabase.co/storage/v1/object/public/dreams/dreams/dream_1761635654123.png
2f84c5e7-0aeb-4b6f-994a-fc3569a5503a	745fdf89-2751-41ee-8554-778ee29f98ae	Explorando la Naturaleza con Amigos	Soñé que tenía un paseo en el bosque con mis amigos y la pasabamos muy bien, dormimos en carpas y había un lago relajante	Este sueño refleja tu deseo de conexión con tus amigos en un entorno natural y relajante. Puede indicar que buscas momentos de tranquilidad y camaradería en tu vida.	2025-10-28 14:51:17.741	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	9d45592d-247b-4778-afde-daca2002693c	\N
46251eee-62d6-4397-b3bb-37d6b4b3e910	745fdf89-2751-41ee-8554-778ee29f98ae	Atrapado en la Falsa Libertad	Soñé que tenía un paseo en el bosque con mis amigos y la pasabamos muy bien, dormimos en carpas y había un lago relajante	Este sueño simboliza una creencia errónea de que la libertad y la relajación solo son posibles fuera de tu entorno habitual. Las carpas representan una provisionalidad engañosa, como si te permitieras escapar solo temporalmente de tus responsabilidades. El lago tranquilo actúa como una trampa, sugiriendo que buscas paz solo en condiciones idílicas que rara vez se presentan en la vida real. Esta fantasía de libertad condicionada refuerza la idea de que tu vida cotidiana es intrínsecamente menos placentera, creando un ciclo de insatisfacción constante.	2025-10-28 16:10:21.578	277b52b2-3fb4-4408-b4ff-9b65ec7bc351	02edcc98-923b-4dfe-9656-c81c6ab990fb	968e4082-b886-47cc-a19f-bd934de66d4a	
\.


--
-- Data for Name: dream_person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dream_person (dream_id, person_id) FROM stdin;
2f84c5e7-0aeb-4b6f-994a-fc3569a5503a	3cf36793-53b0-40b9-ba06-433faea058ce
46251eee-62d6-4397-b3bb-37d6b4b3e910	3cf36793-53b0-40b9-ba06-433faea058ce
\.


--
-- Data for Name: dream_privacy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dream_privacy (id, privacy_description) FROM stdin;
73829ed1-6348-49ca-a180-95a4a2f3b434	Publico
277b52b2-3fb4-4408-b4ff-9b65ec7bc351	Privado
672422fc-475f-42a1-9fc0-d1554c6a5b3c	Anonimo
\.


--
-- Data for Name: dream_state; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dream_state (id, state_description) FROM stdin;
02edcc98-923b-4dfe-9656-c81c6ab990fb	Activo
4c6e14c2-1ffb-4dd4-9812-8bfc5d96c827	Archivado
\.


--
-- Data for Name: dream_theme; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dream_theme (dream_id, theme_id) FROM stdin;
2f84c5e7-0aeb-4b6f-994a-fc3569a5503a	9de2d301-c9e3-45c7-994a-213bb9a65a8d
2f84c5e7-0aeb-4b6f-994a-fc3569a5503a	43d802df-df34-4643-bf47-4e821dab4721
46251eee-62d6-4397-b3bb-37d6b4b3e910	b2f01a2b-a57b-4426-b424-527e112596ec
46251eee-62d6-4397-b3bb-37d6b4b3e910	f364c9c0-bcbc-4ff4-bbe8-d3846e6c4de5
\.


--
-- Data for Name: emotion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.emotion (id, emotion, color) FROM stdin;
9d45592d-247b-4778-afde-daca2002693c	Felicidad	#FFFF00
28ef5090-cba6-4e56-8c96-cb8091581dcc	Tristeza	#0000FF
968e4082-b886-47cc-a19f-bd934de66d4a	Miedo	#800080
889e4b20-3e43-4b4a-b6f0-22733ca0f43d	Enojo	#FF0000
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, date_of_birth, coin_amount) FROM stdin;
745fdf89-2751-41ee-8554-778ee29f98ae	\N	0
2d57c1c8-b94d-4df9-a3c4-0d6cbdcc0965	\N	0
798a0644-deb5-4abd-8593-3829b4a9a8df	\N	0
c4efd970-b52b-4db8-8fb4-fa293fcc9517	\N	0
2317247e-c013-4f13-b676-cd40a75f9aa8	\N	0
c61a0f6c-6542-4476-a603-c641f86f23b8	\N	0
\.


--
-- Data for Name: profile_emotion_context; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_emotion_context (id, profile_id, label, last_updated) FROM stdin;
a42a2012-0689-405d-857d-b9872f2e6c4f	745fdf89-2751-41ee-8554-778ee29f98ae	felicidad	2025-10-28 14:51:22.41524+00
ece47d54-4a8d-4067-a84b-b68d17915d4b	745fdf89-2751-41ee-8554-778ee29f98ae	relajación	2025-10-28 14:51:23.017495+00
3a146d2a-75fd-471a-86d9-75957262e8c0	745fdf89-2751-41ee-8554-778ee29f98ae	insatisfacción	2025-10-28 16:10:25.594312+00
f1200acb-0953-4ed1-9067-dc90cef3b036	745fdf89-2751-41ee-8554-778ee29f98ae	engañosa	2025-10-28 16:10:26.309868+00
\.


--
-- Data for Name: profile_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_location (id, profile_id, label, last_updated) FROM stdin;
6e19991d-22a4-4fec-8856-6e3e0aaa739b	745fdf89-2751-41ee-8554-778ee29f98ae	bosque	2025-10-28 14:51:21.124773+00
5a82b57f-a7ac-477f-b5e0-d98f5eb29f3e	745fdf89-2751-41ee-8554-778ee29f98ae	lago	2025-10-28 14:51:21.753491+00
\.


--
-- Data for Name: profile_person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_person (id, profile_id, label, last_updated) FROM stdin;
3cf36793-53b0-40b9-ba06-433faea058ce	745fdf89-2751-41ee-8554-778ee29f98ae	amigos	2025-10-28 14:51:20.494753+00
\.


--
-- Data for Name: profile_theme; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_theme (id, profile_id, label, last_updated) FROM stdin;
9de2d301-c9e3-45c7-994a-213bb9a65a8d	745fdf89-2751-41ee-8554-778ee29f98ae	amistad	2025-10-28 14:51:19.159494+00
43d802df-df34-4643-bf47-4e821dab4721	745fdf89-2751-41ee-8554-778ee29f98ae	naturaleza	2025-10-28 14:51:19.813151+00
b2f01a2b-a57b-4426-b424-527e112596ec	745fdf89-2751-41ee-8554-778ee29f98ae	expectativas irrealistas	2025-10-28 16:10:23.177288+00
f364c9c0-bcbc-4ff4-bbe8-d3846e6c4de5	745fdf89-2751-41ee-8554-778ee29f98ae	aversión a la rutina	2025-10-28 16:10:23.921002+00
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room (id, room_url) FROM stdin;
\.


--
-- Data for Name: setting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.setting (id, profile_id, setting_name) FROM stdin;
\.


--
-- Data for Name: skin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skin (id, skin_url) FROM stdin;
\.


--
-- Data for Name: tier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tier (id, tier_name, coin) FROM stdin;
\.


--
-- Data for Name: user_badge; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_badge (profile_id, badge_id) FROM stdin;
\.


--
-- Data for Name: user_room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_room (profile_id, room_id) FROM stdin;
\.


--
-- Data for Name: user_skin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_skin (profile_id, skin_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-09-24 01:13:30
20211116045059	2025-09-24 01:13:32
20211116050929	2025-09-24 01:13:35
20211116051442	2025-09-24 01:13:37
20211116212300	2025-09-24 01:13:39
20211116213355	2025-09-24 01:13:41
20211116213934	2025-09-24 01:13:43
20211116214523	2025-09-24 01:13:46
20211122062447	2025-09-24 01:13:48
20211124070109	2025-09-24 01:13:50
20211202204204	2025-09-24 01:13:52
20211202204605	2025-09-24 01:13:54
20211210212804	2025-09-24 01:14:00
20211228014915	2025-09-24 01:14:02
20220107221237	2025-09-24 01:14:04
20220228202821	2025-09-24 01:14:06
20220312004840	2025-09-24 01:14:08
20220603231003	2025-09-24 01:14:11
20220603232444	2025-09-24 01:14:13
20220615214548	2025-09-24 01:14:16
20220712093339	2025-09-24 01:14:18
20220908172859	2025-09-24 01:14:20
20220916233421	2025-09-24 01:14:22
20230119133233	2025-09-24 01:14:24
20230128025114	2025-09-24 01:14:26
20230128025212	2025-09-24 01:14:28
20230227211149	2025-09-24 01:14:30
20230228184745	2025-09-24 01:14:32
20230308225145	2025-09-24 01:14:34
20230328144023	2025-09-24 01:14:36
20231018144023	2025-09-24 01:14:39
20231204144023	2025-09-24 01:14:42
20231204144024	2025-09-24 01:14:44
20231204144025	2025-09-24 01:14:46
20240108234812	2025-09-24 01:14:48
20240109165339	2025-09-24 01:14:50
20240227174441	2025-09-24 01:14:53
20240311171622	2025-09-24 01:14:56
20240321100241	2025-09-24 01:15:00
20240401105812	2025-09-24 01:15:06
20240418121054	2025-09-24 01:15:09
20240523004032	2025-09-24 01:15:16
20240618124746	2025-09-24 01:15:18
20240801235015	2025-09-24 01:15:20
20240805133720	2025-09-24 01:15:22
20240827160934	2025-09-24 01:15:24
20240919163303	2025-09-24 01:15:27
20240919163305	2025-09-24 01:15:29
20241019105805	2025-09-24 01:15:31
20241030150047	2025-09-24 01:15:38
20241108114728	2025-09-24 01:15:41
20241121104152	2025-09-24 01:15:43
20241130184212	2025-09-24 01:15:45
20241220035512	2025-09-24 01:15:47
20241220123912	2025-09-24 01:15:49
20241224161212	2025-09-24 01:15:51
20250107150512	2025-09-24 01:15:53
20250110162412	2025-09-24 01:15:55
20250123174212	2025-09-24 01:15:57
20250128220012	2025-09-24 01:15:59
20250506224012	2025-09-24 01:16:01
20250523164012	2025-09-24 01:16:03
20250714121412	2025-09-24 01:16:05
20250905041441	2025-09-24 01:16:07
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
dreams	dreams	\N	2025-10-19 20:53:12.025528+00	2025-10-19 20:53:12.025528+00	t	f	\N	\N	\NSTANDARD
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (id, type, format, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-09-24 01:13:26.980665
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-09-24 01:13:26.98996
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-09-24 01:13:26.998392
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-09-24 01:13:27.02069
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-09-24 01:13:27.110535
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-09-24 01:13:27.11717
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-09-24 01:13:27.124657
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-09-24 01:13:27.13171
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-09-24 01:13:27.137883
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-09-24 01:13:27.144584
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-09-24 01:13:27.152122
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-09-24 01:13:27.158841
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-09-24 01:13:27.168881
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-09-24 01:13:27.175727
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-09-24 01:13:27.182481
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-09-24 01:13:27.213242
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-09-24 01:13:27.22076
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-09-24 01:13:27.227082
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-09-24 01:13:27.23387
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-09-24 01:13:27.241743
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-09-24 01:13:27.248351
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-09-24 01:13:27.258313
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-09-24 01:13:27.27461
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-09-24 01:13:27.288093
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-09-24 01:13:27.2997
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-09-24 01:13:27.306307
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-09-29 01:05:39.762765
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-09-29 01:05:39.847776
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-09-29 01:05:39.86279
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-09-29 01:05:39.872202
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-09-29 01:05:39.879486
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-09-29 01:05:39.886945
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-09-29 01:05:39.895234
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-09-29 01:05:39.903299
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-09-29 01:05:39.905632
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-09-29 01:05:39.915615
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-09-29 01:05:39.921815
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-09-29 01:05:39.934846
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-09-29 01:05:39.941637
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-09-29 01:05:39.96419
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-09-29 01:05:39.970934
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-09-29 01:05:39.98392
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-09-29 01:05:39.991945
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-09-29 01:05:40.007294
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
cf98ed20-b861-487f-a9b7-49803b696147	dreams	dreams/dream_1760907608271.png	\N	2025-10-19 21:00:10.381937+00	2025-10-19 21:00:10.381937+00	2025-10-19 21:00:10.381937+00	{"eTag": "\\"8fe65bd3c1a756374ecbd931bec416da\\"", "size": 1745969, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-19T21:00:11.000Z", "contentLength": 1745969, "httpStatusCode": 200}	46fb176b-4fe3-45f7-84c3-c1ec4e8c2a08	\N	{}	2
8bcf8c35-d734-4529-976c-35bbd7d82c17	dreams	dreams/dream_1761104698457.png	\N	2025-10-22 03:45:00.263962+00	2025-10-22 03:45:00.263962+00	2025-10-22 03:45:00.263962+00	{"eTag": "\\"0c4f245186fde654c317ba8d08d28796\\"", "size": 1511375, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T03:45:01.000Z", "contentLength": 1511375, "httpStatusCode": 200}	6a26318a-894c-4364-b717-8fca767165ff	\N	{}	2
b1d365a5-0ecc-42b3-b59a-7f380c6fc54b	dreams	dreams/dream_1760908237927.png	\N	2025-10-19 21:10:39.217394+00	2025-10-19 21:10:39.217394+00	2025-10-19 21:10:39.217394+00	{"eTag": "\\"47594d248d6e634096d0a91efd86d913\\"", "size": 1696012, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-19T21:10:40.000Z", "contentLength": 1696012, "httpStatusCode": 200}	dfe02087-6cfa-4768-9948-92805bd3e688	\N	{}	2
a2cc2933-3dd1-4785-a161-8436c1172382	dreams	dreams/dream_1761229080711.png	\N	2025-10-23 14:18:04.252158+00	2025-10-23 14:18:04.252158+00	2025-10-23 14:18:04.252158+00	{"eTag": "\\"8b78be77405ead77e12438730e6cd561\\"", "size": 1530452, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:18:05.000Z", "contentLength": 1530452, "httpStatusCode": 200}	486cb860-afd5-4c0e-9ef0-b9c713d6386b	\N	{}	2
e52cd612-7785-49a3-993e-45af84532ed4	dreams	dreams/dream_1760909713870.png	\N	2025-10-19 21:35:15.393088+00	2025-10-19 21:35:15.393088+00	2025-10-19 21:35:15.393088+00	{"eTag": "\\"f8248dc6386349db708af8ee88055dc1\\"", "size": 1784784, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-19T21:35:16.000Z", "contentLength": 1784784, "httpStatusCode": 200}	fc1f5cd5-7e25-4025-9824-e8cb1bcbede9	\N	{}	2
6d1f4bf9-0145-42a9-91d1-f57ae53bddb6	dreams	dreams/dream_1761105153079.png	\N	2025-10-22 03:52:35.242729+00	2025-10-22 03:52:35.242729+00	2025-10-22 03:52:35.242729+00	{"eTag": "\\"9637384256baf4a1e861c8dc85ce2f2d\\"", "size": 1500152, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T03:52:36.000Z", "contentLength": 1500152, "httpStatusCode": 200}	301c1b4c-0c52-4ac5-aa36-fe52e15fa31d	\N	{}	2
1218a9ce-83d2-4b6d-ac9e-dd305f855a87	dreams	dreams/dream_1760998540466.png	\N	2025-10-20 22:15:42.241324+00	2025-10-20 22:15:42.241324+00	2025-10-20 22:15:42.241324+00	{"eTag": "\\"5622b3d7066bb8e8661458a5f605af3b\\"", "size": 1424618, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T22:15:43.000Z", "contentLength": 1424618, "httpStatusCode": 200}	d11f7fdb-96ce-472c-93b2-500510331538	\N	{}	2
0ed01cb6-415e-4592-b960-81bf53eb167d	dreams	dreams/dream_1760998554281.png	\N	2025-10-20 22:15:55.696155+00	2025-10-20 22:15:55.696155+00	2025-10-20 22:15:55.696155+00	{"eTag": "\\"d183ebeb9302dafc173eb3e02c82f0ce\\"", "size": 1248174, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T22:15:56.000Z", "contentLength": 1248174, "httpStatusCode": 200}	6e2b4cd8-5a63-4bc4-89d6-604356a25c92	\N	{}	2
6dd9641b-8dd8-4768-b9fa-c244cdf5f01f	dreams	dreams/dream_1761111520961.png	\N	2025-10-22 05:38:43.143205+00	2025-10-22 05:38:43.143205+00	2025-10-22 05:38:43.143205+00	{"eTag": "\\"556cd3497c4764a869c5479f6ffe4dfb\\"", "size": 1608389, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:38:43.000Z", "contentLength": 1608389, "httpStatusCode": 200}	8a275e2c-427d-4bdc-8f12-fff1478aeda4	\N	{}	2
3443399a-7702-4772-b5d0-fa2bf6f135da	dreams	dreams/dream_1760998761523.png	\N	2025-10-20 22:19:22.539652+00	2025-10-20 22:19:22.539652+00	2025-10-20 22:19:22.539652+00	{"eTag": "\\"4ff1f2f3ec94d757e9de68f53a5da62e\\"", "size": 1519993, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T22:19:23.000Z", "contentLength": 1519993, "httpStatusCode": 200}	ccd2396f-2790-43e8-93c4-67fa209a74d4	\N	{}	2
6b320b2a-1f5a-4447-b53b-4f1ebfc2ab43	dreams	dreams/dream_1760998781210.png	\N	2025-10-20 22:19:43.419199+00	2025-10-20 22:19:43.419199+00	2025-10-20 22:19:43.419199+00	{"eTag": "\\"c4d4f31113555e8c02250ad5a45c3dc5\\"", "size": 1412679, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T22:19:44.000Z", "contentLength": 1412679, "httpStatusCode": 200}	5268c766-558f-4daf-a188-a4b2bdf7dea2	\N	{}	2
b6b92df2-e39c-498d-86e1-e5166942e938	dreams	dreams/dream_1760998825724.png	\N	2025-10-20 22:20:27.116028+00	2025-10-20 22:20:27.116028+00	2025-10-20 22:20:27.116028+00	{"eTag": "\\"2bff7083bee6e988963ab4c92bcbefa3\\"", "size": 1465114, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T22:20:28.000Z", "contentLength": 1465114, "httpStatusCode": 200}	3004e00d-38ed-4fe8-8289-873ef841b473	\N	{}	2
762d76ba-789d-4180-87a5-ad93db4cfb54	dreams	dreams/dream_1760999392509.png	\N	2025-10-20 22:26:06.268619+00	2025-10-20 22:26:06.268619+00	2025-10-20 22:26:06.268619+00	{"eTag": "\\"3f838a36952804d8a74edf3697eb1669\\"", "size": 1507899, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T22:26:07.000Z", "contentLength": 1507899, "httpStatusCode": 200}	53ca6bc9-7d0d-4f20-8b1c-33d42725ed70	\N	{}	2
8f666e94-d162-4f74-817e-22b4da62c23c	dreams	dreams/dream_1760999302811.png	\N	2025-10-20 22:28:24.826638+00	2025-10-20 22:28:24.826638+00	2025-10-20 22:28:24.826638+00	{"eTag": "\\"9cbc7e96d9d0bfad4f72424c5af5096d\\"", "size": 1432471, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T22:28:25.000Z", "contentLength": 1432471, "httpStatusCode": 200}	62c4d1b9-5f1a-4bcf-81b8-2ebdf1c3f58b	\N	{}	2
1cdaedc0-c94f-4cc8-bfc1-d5d08ebfa5db	dreams	dreams/dream_1761002435116.png	\N	2025-10-20 23:20:37.098018+00	2025-10-20 23:20:37.098018+00	2025-10-20 23:20:37.098018+00	{"eTag": "\\"779343a92fc16d8bbb9aa3f12e9d3b94\\"", "size": 1274569, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T23:20:37.000Z", "contentLength": 1274569, "httpStatusCode": 200}	556f96b3-0ede-481c-ab38-a035750ffa8e	\N	{}	2
85572c0b-4cc9-4a26-9876-92c8caa1ccc5	dreams	dreams/dream_1761002532286.png	\N	2025-10-20 23:22:13.908328+00	2025-10-20 23:22:13.908328+00	2025-10-20 23:22:13.908328+00	{"eTag": "\\"2e0c3aea3e2f217cd4fb6b91b0b5808b\\"", "size": 1513943, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T23:22:14.000Z", "contentLength": 1513943, "httpStatusCode": 200}	51ff76a7-5c80-4d94-9492-68e4e0d0b841	\N	{}	2
b4e316dc-b992-455f-8e63-9fe95283fcfe	dreams	dreams/dream_1761004479191.png	\N	2025-10-20 23:54:40.147868+00	2025-10-20 23:54:40.147868+00	2025-10-20 23:54:40.147868+00	{"eTag": "\\"df549ecdfe5d02ede144a3e0e74243cc\\"", "size": 1473437, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-20T23:54:41.000Z", "contentLength": 1473437, "httpStatusCode": 200}	bb74b4c9-329e-41ea-8a18-148a85538bfc	\N	{}	2
a60591ed-faa6-4e6c-81ac-e3550d7836a8	dreams	dreams/dream_1761229164618.png	\N	2025-10-23 14:19:26.747167+00	2025-10-23 14:19:26.747167+00	2025-10-23 14:19:26.747167+00	{"eTag": "\\"05df4482a58c1a5722eccaadcda3d1a7\\"", "size": 1623926, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:19:27.000Z", "contentLength": 1623926, "httpStatusCode": 200}	48e09fd5-abb6-4390-9acb-54695077a0cf	\N	{}	2
9ff2e1ec-ad74-48b1-8fa4-41bcae4f5700	dreams	dreams/dream_1761005059873.png	\N	2025-10-21 00:04:22.928219+00	2025-10-21 00:04:22.928219+00	2025-10-21 00:04:22.928219+00	{"eTag": "\\"fac471c0a96cd8276659d1327bc36a50\\"", "size": 1523953, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T00:04:23.000Z", "contentLength": 1523953, "httpStatusCode": 200}	7ca6871a-5c16-41fd-89a2-1b273cc5bd86	\N	{}	2
bdfe4262-494b-4474-a4fa-3797c8f451ff	dreams	dreams/dream_1761105833067.png	\N	2025-10-22 04:03:55.291101+00	2025-10-22 04:03:55.291101+00	2025-10-22 04:03:55.291101+00	{"eTag": "\\"e12c12b49056d670fe3b59beb7ddd6a7\\"", "size": 1464677, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T04:03:56.000Z", "contentLength": 1464677, "httpStatusCode": 200}	8ac6e563-35f0-4b99-81ff-f42cae481dcf	\N	{}	2
d06c41e9-3e95-4e0d-bb59-59f50d9d3e6c	dreams	dreams/dream_1761009186103.png	\N	2025-10-21 01:13:08.759433+00	2025-10-21 01:13:08.759433+00	2025-10-21 01:13:08.759433+00	{"eTag": "\\"c3de067f31e74a3735018d31a991ddab\\"", "size": 1351106, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:13:09.000Z", "contentLength": 1351106, "httpStatusCode": 200}	5f633a3b-6143-4f96-b5a6-6f827521d244	\N	{}	2
090a6740-2df2-4ff3-b724-d05e9f6401c8	dreams	dreams/dream_1761009676303.png	\N	2025-10-21 01:21:19.038772+00	2025-10-21 01:21:19.038772+00	2025-10-21 01:21:19.038772+00	{"eTag": "\\"ad6cf85f429517b78c84b9072b7c506a\\"", "size": 1657722, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:21:19.000Z", "contentLength": 1657722, "httpStatusCode": 200}	e76c4a8f-63b3-4cf1-a2ff-86fa332b1b5b	\N	{}	2
4f031164-ce2e-4af0-b6c2-39dfca79125c	dreams	dreams/dream_1761106130473.png	\N	2025-10-22 04:08:52.679148+00	2025-10-22 04:08:52.679148+00	2025-10-22 04:08:52.679148+00	{"eTag": "\\"514df5eb31f72b8168d3094a2514ede3\\"", "size": 1591260, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T04:08:53.000Z", "contentLength": 1591260, "httpStatusCode": 200}	babf09c1-f386-45dc-849e-77ffc01ab862	\N	{}	2
239bd37d-f740-4283-9479-984a76f34626	dreams	dreams/dream_1761009770943.png	\N	2025-10-21 01:22:53.075448+00	2025-10-21 01:22:53.075448+00	2025-10-21 01:22:53.075448+00	{"eTag": "\\"b04dfbdba06115bedfd48761d8bbf802\\"", "size": 1413916, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:22:53.000Z", "contentLength": 1413916, "httpStatusCode": 200}	c585025d-ca97-4340-acaf-71f0cca1c204	\N	{}	2
b381c38b-721d-4a61-b838-168f3c31cbbc	dreams	dreams/dream_1761111789691.png	\N	2025-10-22 05:43:11.746442+00	2025-10-22 05:43:11.746442+00	2025-10-22 05:43:11.746442+00	{"eTag": "\\"01b28aa8cbe3ec60508a31490e1af5f6\\"", "size": 1464514, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:43:12.000Z", "contentLength": 1464514, "httpStatusCode": 200}	21edf074-7fad-4362-a0fa-dc8d089a5ee8	\N	{}	2
eb742b20-95ee-4d0f-948e-0bfa87c439ff	dreams	dreams/dream_1761009918791.png	\N	2025-10-21 01:25:20.823853+00	2025-10-21 01:25:20.823853+00	2025-10-21 01:25:20.823853+00	{"eTag": "\\"5f7156516459a83501b41a0d7042bd3e\\"", "size": 1472458, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:25:21.000Z", "contentLength": 1472458, "httpStatusCode": 200}	224b7a91-0393-4cbf-8682-be1a58aaf14b	\N	{}	2
c1da1289-849e-473a-9c10-9338228915cc	dreams	dreams/dream_1761010076203.png	\N	2025-10-21 01:27:58.626168+00	2025-10-21 01:27:58.626168+00	2025-10-21 01:27:58.626168+00	{"eTag": "\\"a9437345c8368a03627e59b8f6a2d234\\"", "size": 1556007, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:27:59.000Z", "contentLength": 1556007, "httpStatusCode": 200}	fc7c7397-0986-4d6d-8917-19777f7b9e03	\N	{}	2
067748fe-123f-42f4-9dca-123504b6a445	dreams	dreams/dream_1761112262656.png	\N	2025-10-22 05:51:04.655723+00	2025-10-22 05:51:04.655723+00	2025-10-22 05:51:04.655723+00	{"eTag": "\\"ede490d637ae947602afaa6e839897a8\\"", "size": 1353081, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:51:05.000Z", "contentLength": 1353081, "httpStatusCode": 200}	fd9c162f-428d-4d1f-8fa8-4bcd56a2c2f7	\N	{}	2
1dcc75c3-a7f8-400a-b639-7ea28ef12654	dreams	dreams/dream_1761010119172.png	\N	2025-10-21 01:28:40.743833+00	2025-10-21 01:28:40.743833+00	2025-10-21 01:28:40.743833+00	{"eTag": "\\"7d7ed89dff0992e96d2471609a317bf9\\"", "size": 1566335, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:28:41.000Z", "contentLength": 1566335, "httpStatusCode": 200}	881674a0-1812-4996-9b63-b50f85d8504d	\N	{}	2
6945b5ee-1c61-49c3-88d5-0865a9103b7b	dreams	dreams/dream_1761010391960.png	\N	2025-10-21 01:33:14.358098+00	2025-10-21 01:33:14.358098+00	2025-10-21 01:33:14.358098+00	{"eTag": "\\"edae74fa721cc0e102746402314bd305\\"", "size": 1463478, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:33:15.000Z", "contentLength": 1463478, "httpStatusCode": 200}	667c812f-6afd-4e45-8745-06735928fe42	\N	{}	2
b251d8cc-6f07-4db8-a9f1-2bb2d627bcd3	dreams	dreams/dream_1761011291045.png	\N	2025-10-21 01:44:25.812071+00	2025-10-21 01:44:25.812071+00	2025-10-21 01:44:25.812071+00	{"eTag": "\\"5c9c2123275dd90cc92ea1d2b11dac38\\"", "size": 1497696, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:44:26.000Z", "contentLength": 1497696, "httpStatusCode": 200}	f7401ba0-65f0-478a-ae84-107b2acc29fc	\N	{}	2
c2254070-dbd5-4d3a-a565-af50b991de7b	dreams	dreams/dream_1761011333247.png	\N	2025-10-21 01:45:07.656933+00	2025-10-21 01:45:07.656933+00	2025-10-21 01:45:07.656933+00	{"eTag": "\\"13d0b926421d26bf88fde775b2965136\\"", "size": 1648679, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:45:08.000Z", "contentLength": 1648679, "httpStatusCode": 200}	d6e57d63-d7e3-4e71-a326-4657ce2013bb	\N	{}	2
6a3551f7-ae09-49b0-8a43-7b07d3ab8b8a	dreams	dreams/dream_1761011851008.png	\N	2025-10-21 01:53:44.607873+00	2025-10-21 01:53:44.607873+00	2025-10-21 01:53:44.607873+00	{"eTag": "\\"f5d02facdba29f81c6623ee049f6ddcb\\"", "size": 1556558, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:53:45.000Z", "contentLength": 1556558, "httpStatusCode": 200}	9227fe7c-7cb0-4dcb-a996-1c7f4b0f0e29	\N	{}	2
80603c3f-521a-4b74-b552-a244471f7927	dreams	dreams/dream_1761011983010.png	\N	2025-10-21 01:55:56.964458+00	2025-10-21 01:55:56.964458+00	2025-10-21 01:55:56.964458+00	{"eTag": "\\"e4674c2abc83f2bad192032f9ef21cc7\\"", "size": 1523948, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:55:57.000Z", "contentLength": 1523948, "httpStatusCode": 200}	78b3d394-4aff-458c-9933-f29ecc58d9b1	\N	{}	2
601ba42d-975d-47ff-9d64-51960d5296d8	dreams	dreams/dream_1761229202995.png	\N	2025-10-23 14:20:04.698571+00	2025-10-23 14:20:04.698571+00	2025-10-23 14:20:04.698571+00	{"eTag": "\\"b890e59792971a3c3b7a92840b151183\\"", "size": 1792183, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:20:05.000Z", "contentLength": 1792183, "httpStatusCode": 200}	9b5016ee-41c7-495c-af1d-ef8f5bbd3712	\N	{}	2
7db0f5fe-d133-4e19-beb7-053a5a19a19d	dreams	dreams/dream_1761012026308.png	\N	2025-10-21 01:56:40.976156+00	2025-10-21 01:56:40.976156+00	2025-10-21 01:56:40.976156+00	{"eTag": "\\"0c6f6f5acf5eef7b332a4923fab10101\\"", "size": 1581905, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:56:41.000Z", "contentLength": 1581905, "httpStatusCode": 200}	71991d1d-d0cc-4a02-b99c-d299a211ba56	\N	{}	2
64a190f6-70a4-4df8-9589-7ae0e7cdb0f0	dreams	dreams/dream_1761106789622.png	\N	2025-10-22 04:19:51.861507+00	2025-10-22 04:19:51.861507+00	2025-10-22 04:19:51.861507+00	{"eTag": "\\"5db794d7ace45a7d485b149cd8d16af5\\"", "size": 1572081, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T04:19:52.000Z", "contentLength": 1572081, "httpStatusCode": 200}	61d6a461-bbf4-4b88-a888-19d6727cc671	\N	{}	2
d9b8dfdc-a81f-4b08-8534-908a0c6e48be	dreams	dreams/dream_1761012191457.png	\N	2025-10-21 01:59:25.204638+00	2025-10-21 01:59:25.204638+00	2025-10-21 01:59:25.204638+00	{"eTag": "\\"90cea10f1b181b863484c0b946f44b56\\"", "size": 1533968, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T01:59:26.000Z", "contentLength": 1533968, "httpStatusCode": 200}	fda546dd-ab41-4f5c-b4ba-efe1dfda9b01	\N	{}	2
0d7d9e39-5a80-4299-810e-3772ba1a1493	dreams	dreams/dream_1761012340585.png	\N	2025-10-21 02:01:54.595058+00	2025-10-21 02:01:54.595058+00	2025-10-21 02:01:54.595058+00	{"eTag": "\\"20b5cccf78d9e87d18c61f7c62c5c66e\\"", "size": 1630053, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:01:55.000Z", "contentLength": 1630053, "httpStatusCode": 200}	57a152eb-0b12-4285-b334-89ee1000a574	\N	{}	2
a23417d7-1655-406a-8e44-065b9c59747b	dreams	dreams/dream_1761106981030.png	\N	2025-10-22 04:23:03.291087+00	2025-10-22 04:23:03.291087+00	2025-10-22 04:23:03.291087+00	{"eTag": "\\"c313cce8a1dcc0051c6f3569f8683fd2\\"", "size": 1465279, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T04:23:04.000Z", "contentLength": 1465279, "httpStatusCode": 200}	6ef9021c-0956-40f8-9ab7-4bef423c2383	\N	{}	2
daa43711-7beb-4286-b330-a545819ca0f9	dreams	dreams/dream_1761012240107.png	\N	2025-10-21 02:04:02.235162+00	2025-10-21 02:04:02.235162+00	2025-10-21 02:04:02.235162+00	{"eTag": "\\"d49ca62dedd443121bbcfe7095addac9\\"", "size": 1736274, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:04:03.000Z", "contentLength": 1736274, "httpStatusCode": 200}	e11349ed-be6e-4897-bac6-306971c1c145	\N	{}	2
289c14fc-eb0e-492c-abda-a5dabf4e0cb5	dreams	dreams/dream_1761012329017.png	\N	2025-10-21 02:05:30.518022+00	2025-10-21 02:05:30.518022+00	2025-10-21 02:05:30.518022+00	{"eTag": "\\"0964f76b08b828813312c02b7bc389d4\\"", "size": 1545439, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:05:31.000Z", "contentLength": 1545439, "httpStatusCode": 200}	70e2d0df-0c0b-4021-81f4-700fa6e81e8f	\N	{}	2
18b640a4-dc05-4b73-9b5f-522d3ec718be	dreams	dreams/dream_1761112566240.png	\N	2025-10-22 05:56:08.400823+00	2025-10-22 05:56:08.400823+00	2025-10-22 05:56:08.400823+00	{"eTag": "\\"d1626b9d26d960fd425f163fb51a5ca0\\"", "size": 1480327, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:56:09.000Z", "contentLength": 1480327, "httpStatusCode": 200}	9b2add79-49fc-4b55-813d-00b54d67025e	\N	{}	2
1e6d8dd1-24dc-49b5-8c4c-c683102e1f2b	dreams	dreams/dream_1761012643421.png	\N	2025-10-21 02:10:45.543857+00	2025-10-21 02:10:45.543857+00	2025-10-21 02:10:45.543857+00	{"eTag": "\\"71aa498505dfc011356f5d6d4f693e8d\\"", "size": 1712599, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:10:46.000Z", "contentLength": 1712599, "httpStatusCode": 200}	7f2e38a6-e7d6-405d-9ca0-40b1502548e1	\N	{}	2
9950a959-0ded-4231-8e73-49d79f624135	dreams	dreams/dream_1761113852959.png	\N	2025-10-22 06:17:35.039303+00	2025-10-22 06:17:35.039303+00	2025-10-22 06:17:35.039303+00	{"eTag": "\\"f4714845816578491c8e8e5f6e2a96a8\\"", "size": 1601391, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T06:17:35.000Z", "contentLength": 1601391, "httpStatusCode": 200}	cdfddb7e-34b5-483a-9591-d5cfc2e9ff0b	\N	{}	2
295724a3-0fa3-41dd-a556-519c6cfa1431	dreams	dreams/dream_1761013032028.png	\N	2025-10-21 02:17:14.269803+00	2025-10-21 02:17:14.269803+00	2025-10-21 02:17:14.269803+00	{"eTag": "\\"79252414ccd5855b91155a6e31c73f22\\"", "size": 1500542, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:17:15.000Z", "contentLength": 1500542, "httpStatusCode": 200}	78fe1497-9764-489d-be17-6a7a1e1412a7	\N	{}	2
ed1c61d6-34ff-42ce-b17b-90d8d47f293f	dreams	dreams/dream_1761013135468.png	\N	2025-10-21 02:18:58.33579+00	2025-10-21 02:18:58.33579+00	2025-10-21 02:18:58.33579+00	{"eTag": "\\"36b53d1daee3abd7279f36f8e668f7e2\\"", "size": 1707824, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:18:59.000Z", "contentLength": 1707824, "httpStatusCode": 200}	0ef620c8-d927-4c54-8b43-dc36f0816c51	\N	{}	2
eae01bdc-a7ad-4ede-a803-a49279806601	dreams	dreams/dream_1761013174170.png	\N	2025-10-21 02:19:36.255503+00	2025-10-21 02:19:36.255503+00	2025-10-21 02:19:36.255503+00	{"eTag": "\\"7c4a069bbc7e67c3c3d44258b87f739b\\"", "size": 1657479, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:19:37.000Z", "contentLength": 1657479, "httpStatusCode": 200}	0f91c904-8234-4e1e-a186-ef5cd967aa5e	\N	{}	2
388c53a9-413a-475f-b483-2cc01a9abc30	dreams	dreams/dream_1761013204384.png	\N	2025-10-21 02:20:05.412334+00	2025-10-21 02:20:05.412334+00	2025-10-21 02:20:05.412334+00	{"eTag": "\\"fa4692493311929843e7a42e49ec6f71\\"", "size": 1502047, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:20:06.000Z", "contentLength": 1502047, "httpStatusCode": 200}	16ec3087-1a39-4ebe-9f8c-4f52888d0840	\N	{}	2
2e6669a9-6dab-4a2f-b050-6a47efa96f22	dreams	dreams/dream_1761013418198.png	\N	2025-10-21 02:23:40.547162+00	2025-10-21 02:23:40.547162+00	2025-10-21 02:23:40.547162+00	{"eTag": "\\"fcae05bb938c026cd85c8783c34a308a\\"", "size": 1551909, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:23:41.000Z", "contentLength": 1551909, "httpStatusCode": 200}	482e8256-095f-4ec3-89ee-3cdd9f93f101	\N	{}	2
7fad31a0-4cae-4b28-9864-50184a30dd81	dreams	dreams/dream_1761013668727.png	\N	2025-10-21 02:27:51.103708+00	2025-10-21 02:27:51.103708+00	2025-10-21 02:27:51.103708+00	{"eTag": "\\"2b112992410b9766750f495051a7a400\\"", "size": 1575207, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:27:52.000Z", "contentLength": 1575207, "httpStatusCode": 200}	f7329c58-9297-4e8a-99ad-4cf63a143310	\N	{}	2
c9f5c99e-eeaf-4bff-b906-bde5ecd6ddae	dreams	dreams/dream_1761348476845.png	\N	2025-10-24 23:27:58.848256+00	2025-10-24 23:27:58.848256+00	2025-10-24 23:27:58.848256+00	{"eTag": "\\"0ec2600116a182c48adbe39027aeddba\\"", "size": 1580414, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T23:27:59.000Z", "contentLength": 1580414, "httpStatusCode": 200}	80a62a59-710c-4482-9a99-ea3e1bc02de6	\N	{}	2
b7aea13f-7b77-407a-8a78-765da022fcb4	dreams	dreams/dream_1761014097631.png	\N	2025-10-21 02:34:59.973201+00	2025-10-21 02:34:59.973201+00	2025-10-21 02:34:59.973201+00	{"eTag": "\\"8158d1b410294d64aee948129315bac6\\"", "size": 1637596, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:35:00.000Z", "contentLength": 1637596, "httpStatusCode": 200}	f98cf96e-21b2-45ba-aee0-f56c844489e4	\N	{}	2
9281098c-38c2-4c8c-94f1-70f69351ce58	dreams	dreams/dream_1761108482195.png	\N	2025-10-22 04:48:04.450055+00	2025-10-22 04:48:04.450055+00	2025-10-22 04:48:04.450055+00	{"eTag": "\\"1a647913a1a0421ba2c9f76060a158ab\\"", "size": 1447140, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T04:48:05.000Z", "contentLength": 1447140, "httpStatusCode": 200}	ecfb84be-a739-4d16-a708-24fecaaee4d2	\N	{}	2
946e558c-076b-41c7-a986-4a721af679c4	dreams	dreams/dream_1761014193272.png	\N	2025-10-21 02:36:35.838952+00	2025-10-21 02:36:35.838952+00	2025-10-21 02:36:35.838952+00	{"eTag": "\\"1d3b5dfde8c9ddc8d172d6987af7600f\\"", "size": 1642205, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:36:36.000Z", "contentLength": 1642205, "httpStatusCode": 200}	5b7d4225-abb8-452a-bb27-897f70195ddb	\N	{}	2
6fc7080e-d38b-40bb-a1d5-c059ea11c72a	dreams	dreams/dream_1761229335025.png	\N	2025-10-23 14:22:17.548005+00	2025-10-23 14:22:17.548005+00	2025-10-23 14:22:17.548005+00	{"eTag": "\\"4ab65b8cfa9b4ae6a40a9d37b885f32a\\"", "size": 1499105, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:22:18.000Z", "contentLength": 1499105, "httpStatusCode": 200}	f36780dc-fb42-453e-83bd-baf1f267c52f	\N	{}	2
7f221108-b301-48f8-8191-499bc49e3ed3	dreams	dreams/dream_1761014253750.png	\N	2025-10-21 02:37:36.404898+00	2025-10-21 02:37:36.404898+00	2025-10-21 02:37:36.404898+00	{"eTag": "\\"aa1bbeddb0a963d15293704149127a00\\"", "size": 1589678, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:37:37.000Z", "contentLength": 1589678, "httpStatusCode": 200}	85cbec91-f964-4e19-830b-75e91dee94df	\N	{}	2
a8f1d5f6-b90d-430f-b9ac-210f7ddceb71	dreams	dreams/dream_1761108764476.png	\N	2025-10-22 04:52:46.573031+00	2025-10-22 04:52:46.573031+00	2025-10-22 04:52:46.573031+00	{"eTag": "\\"f54afe72223d66831c1134934af317a1\\"", "size": 1572175, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T04:52:47.000Z", "contentLength": 1572175, "httpStatusCode": 200}	3f276059-92fc-4c9e-a65f-6d75cced3aa9	\N	{}	2
a3cfb266-9cb7-45d4-b1eb-6d7e55d43321	dreams	dreams/dream_1761015038010.png	\N	2025-10-21 02:50:39.416697+00	2025-10-21 02:50:39.416697+00	2025-10-21 02:50:39.416697+00	{"eTag": "\\"fdc3c5dbec6b69f0a0439626660da92d\\"", "size": 1569195, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T02:50:40.000Z", "contentLength": 1569195, "httpStatusCode": 200}	f75f21c0-1453-43c0-9565-c09d1ac87826	\N	{}	2
14371759-fe56-4572-b0db-30e56e570cc8	dreams	dreams/dream_1761088622979.png	\N	2025-10-21 23:13:16.618003+00	2025-10-21 23:13:16.618003+00	2025-10-21 23:13:16.618003+00	{"eTag": "\\"d3453f9a1bd7958b858bb6040ce77873\\"", "size": 1608056, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T23:13:17.000Z", "contentLength": 1608056, "httpStatusCode": 200}	2879bbc5-2a7a-4c29-a800-7d3594afd477	\N	{}	2
30451c21-1c8c-4d43-ac6f-04abacbd06c5	dreams	dreams/dream_1761112650823.png	\N	2025-10-22 05:57:32.806336+00	2025-10-22 05:57:32.806336+00	2025-10-22 05:57:32.806336+00	{"eTag": "\\"3614d9e6b306a240cfc5d781eada6464\\"", "size": 1570115, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:57:33.000Z", "contentLength": 1570115, "httpStatusCode": 200}	50ea8031-1cb1-4aaa-ac05-e652789ad4e7	\N	{}	2
6494da6e-46e8-41e5-b7ee-3e4a5a3a6ede	dreams	dreams/dream_1761088749733.png	\N	2025-10-21 23:15:23.083864+00	2025-10-21 23:15:23.083864+00	2025-10-21 23:15:23.083864+00	{"eTag": "\\"f38f33e086b65c86ecaaaa2602567c24\\"", "size": 1688088, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-21T23:15:24.000Z", "contentLength": 1688088, "httpStatusCode": 200}	0a97d738-2d82-4255-a781-0de7e6abcea8	\N	{}	2
71535fd2-3544-4b73-9dc3-17fb6e920e4d	dreams	dreams/dream_1761095637661.png	\N	2025-10-22 01:10:11.081011+00	2025-10-22 01:10:11.081011+00	2025-10-22 01:10:11.081011+00	{"eTag": "\\"54969789ca579fcc0ede2d1ceb76828b\\"", "size": 1542798, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T01:10:11.000Z", "contentLength": 1542798, "httpStatusCode": 200}	58804b4d-5ba8-4ef0-9bd0-883a9061e737	\N	{}	2
4449231c-f241-40e0-a2b1-78174124205d	dreams	dreams/dream_1761096049823.png	\N	2025-10-22 01:17:04.065959+00	2025-10-22 01:17:04.065959+00	2025-10-22 01:17:04.065959+00	{"eTag": "\\"ae4d701dc3b306a8f991e178ff7236a6\\"", "size": 1572981, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T01:17:04.000Z", "contentLength": 1572981, "httpStatusCode": 200}	49b637b6-a2d2-4332-8657-3c074f990e3f	\N	{}	2
4fb13f6d-d62e-4a70-ae17-8dfeb77a4f2c	dreams	dreams/dream_1761096238323.png	\N	2025-10-22 01:20:11.696492+00	2025-10-22 01:20:11.696492+00	2025-10-22 01:20:11.696492+00	{"eTag": "\\"0d84fa406de391aa12e2477cadc234f1\\"", "size": 1592466, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T01:20:12.000Z", "contentLength": 1592466, "httpStatusCode": 200}	c9c86041-9eda-4c8e-ba18-80f3db070fc7	\N	{}	2
1e05ce01-79db-4e44-96d7-524ee1820a09	dreams	dreams/dream_1761096765709.png	\N	2025-10-22 01:28:58.578024+00	2025-10-22 01:28:58.578024+00	2025-10-22 01:28:58.578024+00	{"eTag": "\\"678306cb7e461471633d6fb88cb530b8\\"", "size": 1391743, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T01:28:59.000Z", "contentLength": 1391743, "httpStatusCode": 200}	ae2430ed-8099-4dfa-a146-c2979807f099	\N	{}	2
bf583f79-bb40-4de3-aa52-8b9981179694	dreams	dreams/dream_1761097871893.png	\N	2025-10-22 01:47:25.298264+00	2025-10-22 01:47:25.298264+00	2025-10-22 01:47:25.298264+00	{"eTag": "\\"a3b6897305ab2bf242caae0b26d641f5\\"", "size": 1551423, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T01:47:26.000Z", "contentLength": 1551423, "httpStatusCode": 200}	627a9272-af9d-41b9-9b67-dca52d27fbb9	\N	{}	2
0d9d8340-8b4c-4268-a13f-62f7a862a5dc	dreams	dreams/dream_1761097897997.png	\N	2025-10-22 01:47:50.431122+00	2025-10-22 01:47:50.431122+00	2025-10-22 01:47:50.431122+00	{"eTag": "\\"24899a509a0fed777d7db5a964a75652\\"", "size": 1741572, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T01:47:51.000Z", "contentLength": 1741572, "httpStatusCode": 200}	4a509fa3-715c-4d74-b41c-0dbea127907d	\N	{}	2
44f36698-cb6c-4607-ad66-a76dfcfb36a3	dreams	dreams/dream_1761229391065.png	\N	2025-10-23 14:23:13.457245+00	2025-10-23 14:23:13.457245+00	2025-10-23 14:23:13.457245+00	{"eTag": "\\"d6d81d77f2be820e895ede39c7be389e\\"", "size": 1699566, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:23:14.000Z", "contentLength": 1699566, "httpStatusCode": 200}	7a5d9396-0bb0-45cb-8f19-327d28f27585	\N	{}	2
0d876ef3-33a3-45b3-a9f9-6ffa4983f197	dreams	dreams/dream_1761103903408.png	\N	2025-10-22 03:31:45.65133+00	2025-10-22 03:31:45.65133+00	2025-10-22 03:31:45.65133+00	{"eTag": "\\"dd20287cf350b03094e4147494cc6e53\\"", "size": 1661549, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T03:31:46.000Z", "contentLength": 1661549, "httpStatusCode": 200}	b3ccfe67-4a46-4e8a-9ef0-d349553c6844	\N	{}	2
cde984f5-72fb-4f8a-8a6f-02e148f68ba5	dreams	dreams/dream_1761109416595.png	\N	2025-10-22 05:03:38.713693+00	2025-10-22 05:03:38.713693+00	2025-10-22 05:03:38.713693+00	{"eTag": "\\"d7229763a8f9cd06ddb7d835933fac1f\\"", "size": 1449840, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:03:39.000Z", "contentLength": 1449840, "httpStatusCode": 200}	cdafc311-f514-4034-8c58-522ee88cf5dd	\N	{}	2
5dddd66d-bd4a-4be0-b22c-62c0aaa41174	dreams	dreams/dream_1761104602787.png	\N	2025-10-22 03:43:24.852009+00	2025-10-22 03:43:24.852009+00	2025-10-22 03:43:24.852009+00	{"eTag": "\\"3665c9fa9452dd8cc44e82fb358707ab\\"", "size": 1576505, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T03:43:25.000Z", "contentLength": 1576505, "httpStatusCode": 200}	94682aa2-51cf-4f2d-a71f-933b4fad108d	\N	{}	2
22361429-7d5e-438f-ab34-257c0fc454d8	dreams	dreams/dream_1761109844407.png	\N	2025-10-22 05:10:46.4279+00	2025-10-22 05:10:46.4279+00	2025-10-22 05:10:46.4279+00	{"eTag": "\\"58c603e9bd9caecea24b36d5667cccf2\\"", "size": 1620900, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:10:47.000Z", "contentLength": 1620900, "httpStatusCode": 200}	84d96007-6f41-4403-ace8-377267b3b0b1	\N	{}	2
02e4386f-46d1-48f9-b24d-bd204fb84a40	dreams	dreams/dream_1761229522106.png	\N	2025-10-23 14:25:24.39515+00	2025-10-23 14:25:24.39515+00	2025-10-23 14:25:24.39515+00	{"eTag": "\\"4c74fc894635e0b794bddcc8d3a614ad\\"", "size": 1591444, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:25:25.000Z", "contentLength": 1591444, "httpStatusCode": 200}	35511263-02b3-45d0-9c64-48fbd071852c	\N	{}	2
232c5d59-47e9-4d51-ac3b-0157a591704d	dreams	dreams/dream_1761110069240.png	\N	2025-10-22 05:14:31.490297+00	2025-10-22 05:14:31.490297+00	2025-10-22 05:14:31.490297+00	{"eTag": "\\"0432b6a6f68fbea006137977fe35c2f6\\"", "size": 1589186, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:14:32.000Z", "contentLength": 1589186, "httpStatusCode": 200}	2ad00a33-ddc9-4748-b24a-1d80dc8f8c18	\N	{}	2
4d787424-abe1-49bb-bf72-c8f95cea1fe5	dreams	dreams/dream_1761112705996.png	\N	2025-10-22 05:58:27.353863+00	2025-10-22 05:58:27.353863+00	2025-10-22 05:58:27.353863+00	{"eTag": "\\"3fcc14f56718f2d4cb105cab3ac93886\\"", "size": 1602065, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:58:28.000Z", "contentLength": 1602065, "httpStatusCode": 200}	5c9d38a9-5f7d-4769-8e35-b8760de62671	\N	{}	2
4744111f-6995-461b-9036-ded18bebdd77	dreams	dreams/dream_1761348934685.png	\N	2025-10-24 23:35:36.663532+00	2025-10-24 23:35:36.663532+00	2025-10-24 23:35:36.663532+00	{"eTag": "\\"6fede1d2ccb11cc0e17550654944a199\\"", "size": 1609649, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T23:35:37.000Z", "contentLength": 1609649, "httpStatusCode": 200}	9809cf08-01a1-4ec8-8940-75d14838f342	\N	{}	2
6a5adb87-dbdb-42a2-9cae-80452ce00d34	dreams	dreams/dream_1761112725038.png	\N	2025-10-22 05:58:46.834692+00	2025-10-22 05:58:46.834692+00	2025-10-22 05:58:46.834692+00	{"eTag": "\\"d19f147045ac4f112ecf1fe193f415e3\\"", "size": 1531363, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T05:58:47.000Z", "contentLength": 1531363, "httpStatusCode": 200}	c8f161b4-a7de-4a16-83bd-15098e4fec6c	\N	{}	2
4fb5dee2-9257-41d5-ab54-17a69c8d8070	dreams	dreams/dream_1761114126442.png	\N	2025-10-22 06:22:08.469468+00	2025-10-22 06:22:08.469468+00	2025-10-22 06:22:08.469468+00	{"eTag": "\\"afdbaa25133a8732d4f40e735dce8c64\\"", "size": 1469276, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T06:22:09.000Z", "contentLength": 1469276, "httpStatusCode": 200}	48e5c206-5df1-431e-b5b3-419e49240383	\N	{}	2
724a0740-df2b-4d1f-a7a0-7991e5ba225c	dreams	dreams/dream_1761229562217.png	\N	2025-10-23 14:26:03.309635+00	2025-10-23 14:26:03.309635+00	2025-10-23 14:26:03.309635+00	{"eTag": "\\"3f86bf77084928584e8153a2cdeede44\\"", "size": 1591290, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:26:04.000Z", "contentLength": 1591290, "httpStatusCode": 200}	1d834fbe-f90c-4b74-9514-2c2ab30aedc8	\N	{}	2
0c22ea82-847a-447e-8f7a-69c357cadd71	dreams	dreams/dream_1761114509984.png	\N	2025-10-22 06:28:32.060016+00	2025-10-22 06:28:32.060016+00	2025-10-22 06:28:32.060016+00	{"eTag": "\\"fd45ef8c4ca8524969b77312aae577e3\\"", "size": 1501502, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T06:28:32.000Z", "contentLength": 1501502, "httpStatusCode": 200}	448c4d51-2d39-4980-9c0d-27e071852aa9	\N	{}	2
67069dc1-da27-4f24-a015-4b0471c464f6	dreams	dreams/dream_1761114914830.png	\N	2025-10-22 06:35:16.920611+00	2025-10-22 06:35:16.920611+00	2025-10-22 06:35:16.920611+00	{"eTag": "\\"129cfd6bee03968fe2f34617edc485ed\\"", "size": 1609935, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T06:35:17.000Z", "contentLength": 1609935, "httpStatusCode": 200}	4102c80e-50aa-46cf-9c80-546aa0c38b41	\N	{}	2
d838aa1c-3650-4a9b-b90f-f81d5f23c230	dreams	dreams/dream_1761115151913.png	\N	2025-10-22 06:39:14.142971+00	2025-10-22 06:39:14.142971+00	2025-10-22 06:39:14.142971+00	{"eTag": "\\"9e2951f30e10d7b7640c7e72e9e09c70\\"", "size": 1676589, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T06:39:15.000Z", "contentLength": 1676589, "httpStatusCode": 200}	f93db627-3af7-4c61-976b-ea53a510a5a4	\N	{}	2
3dfb06a8-896e-4d1e-8d51-feec49d08f8c	dreams	dreams/dream_1761115315033.png	\N	2025-10-22 06:41:57.165692+00	2025-10-22 06:41:57.165692+00	2025-10-22 06:41:57.165692+00	{"eTag": "\\"2185e0329a16c901a55f7a61bd3fb1c7\\"", "size": 1485563, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T06:41:58.000Z", "contentLength": 1485563, "httpStatusCode": 200}	c7475ebf-7cf9-4d68-a8c0-90da5f56472a	\N	{}	2
9a677115-4148-404f-9a38-d72add79e7ab	dreams	dreams/dream_1761115883280.png	\N	2025-10-22 06:51:25.293561+00	2025-10-22 06:51:25.293561+00	2025-10-22 06:51:25.293561+00	{"eTag": "\\"47191775cf68b12c2d73e9beb8bc1cc0\\"", "size": 1634777, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T06:51:26.000Z", "contentLength": 1634777, "httpStatusCode": 200}	29b59c05-6d01-463c-9204-53fb0a393bcf	\N	{}	2
afd3558c-ee8d-4c11-b133-3382682a2e74	dreams	dreams/dream_1761230132153.png	\N	2025-10-23 14:35:34.608657+00	2025-10-23 14:35:34.608657+00	2025-10-23 14:35:34.608657+00	{"eTag": "\\"7d99087841d6cf231fcff88e2af096c2\\"", "size": 1565513, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:35:35.000Z", "contentLength": 1565513, "httpStatusCode": 200}	1462f4a7-64ed-4538-a428-4197d939c63e	\N	{}	2
109d876d-4729-4ac4-972d-e12d9f8b28b9	dreams	dreams/dream_1761115947340.png	\N	2025-10-22 06:52:29.151203+00	2025-10-22 06:52:29.151203+00	2025-10-22 06:52:29.151203+00	{"eTag": "\\"71ff43a13f64fdcddcbd90ff1ca1f0e8\\"", "size": 1525955, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T06:52:30.000Z", "contentLength": 1525955, "httpStatusCode": 200}	cb4fe82f-da31-463c-8cd5-c8f052a240af	\N	{}	2
962c8b44-bd4b-4c0e-b542-86f264a962e2	dreams	dreams/dream_1761258735658.png	\N	2025-10-23 22:32:19.957992+00	2025-10-23 22:32:19.957992+00	2025-10-23 22:32:19.957992+00	{"eTag": "\\"ff164786d460de10d187efe646f6851e\\"", "size": 1716416, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:32:20.000Z", "contentLength": 1716416, "httpStatusCode": 200}	e12482fb-30a0-4027-830c-1628fbd436aa	\N	{}	2
d841e9b6-c3d5-41b6-baa0-88d2f213b9b7	dreams	dreams/dream_1761258914445.png	\N	2025-10-23 22:35:17.736951+00	2025-10-23 22:35:17.736951+00	2025-10-23 22:35:17.736951+00	{"eTag": "\\"0e22ca8899b1206d570b2bcbb78f91be\\"", "size": 1616549, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:35:18.000Z", "contentLength": 1616549, "httpStatusCode": 200}	0b0ac025-f0f6-44fa-a679-3adb4e86336a	\N	{}	2
8f19aded-0227-4eeb-804c-0b50e5f6e4e8	dreams	dreams/dream_1761437832612.png	\N	2025-10-26 00:17:14.519869+00	2025-10-26 00:17:14.519869+00	2025-10-26 00:17:14.519869+00	{"eTag": "\\"565506600ef45256bd69ec862c96e3c9\\"", "size": 1632498, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T00:17:15.000Z", "contentLength": 1632498, "httpStatusCode": 200}	5f8bf6d0-7224-4356-b0c3-220757b22681	\N	{}	2
ed7e7a23-c6d6-42ec-ae5c-7395dffa862e	dreams	dreams/dream_1761259173398.png	\N	2025-10-23 22:39:37.374803+00	2025-10-23 22:39:37.374803+00	2025-10-23 22:39:37.374803+00	{"eTag": "\\"b53946c6e8b6eff9a819f807fbab8855\\"", "size": 1678661, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:39:38.000Z", "contentLength": 1678661, "httpStatusCode": 200}	308ccd28-202e-4ba8-8950-53680d71db25	\N	{}	2
e1e1bfdb-c44d-44f3-ab9e-6ffd0231b449	dreams	dreams/dream_1761259408849.png	\N	2025-10-23 22:43:32.796571+00	2025-10-23 22:43:32.796571+00	2025-10-23 22:43:32.796571+00	{"eTag": "\\"602bd6d945dddf24adcdb230808958fb\\"", "size": 1590384, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:43:33.000Z", "contentLength": 1590384, "httpStatusCode": 200}	1a9f500d-91c4-42eb-83e6-6d51a81ca3a5	\N	{}	2
31ebe4fe-f316-449f-8e8d-95b287744617	dreams	dreams/dream_1761259650534.png	\N	2025-10-23 22:47:35.178216+00	2025-10-23 22:47:35.178216+00	2025-10-23 22:47:35.178216+00	{"eTag": "\\"c09a946bb8a75d4bb115ddfa1efa9c71\\"", "size": 1307341, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:47:35.000Z", "contentLength": 1307341, "httpStatusCode": 200}	3c40a325-a96c-4e22-a979-f0174bfe6114	\N	{}	2
7e78ce99-b4ac-49a6-b7ea-06b1235ce37a	dreams	dreams/dream_1761260754145.png	\N	2025-10-23 23:05:57.697923+00	2025-10-23 23:05:57.697923+00	2025-10-23 23:05:57.697923+00	{"eTag": "\\"2a7cbfeff4637c9f5a08c6475edd0a0e\\"", "size": 1494726, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:05:58.000Z", "contentLength": 1494726, "httpStatusCode": 200}	c7d66667-6ff2-4282-a0ab-2f530a205e3c	\N	{}	2
0b5bd0ab-1882-44f9-9ff8-495d614b7db4	dreams	dreams/dream_1761261593426.png	\N	2025-10-23 23:19:56.598855+00	2025-10-23 23:19:56.598855+00	2025-10-23 23:19:56.598855+00	{"eTag": "\\"8ef1903867e900019a757b8029de7ba7\\"", "size": 1508717, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:19:57.000Z", "contentLength": 1508717, "httpStatusCode": 200}	e270ac6c-5b19-4ef8-b37f-7fe60c9c4e65	\N	{}	2
e8a1bc34-5532-4191-ad57-366c94de0bc9	dreams	dreams/dream_1761261732422.png	\N	2025-10-23 23:22:18.040214+00	2025-10-23 23:22:18.040214+00	2025-10-23 23:22:18.040214+00	{"eTag": "\\"8a912b6b7d85adc80d7bfdaa2456d8bd\\"", "size": 1520320, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:22:18.000Z", "contentLength": 1520320, "httpStatusCode": 200}	e3d18668-2d26-4bb0-a2b0-50fa13d0b072	\N	{}	2
0c0adfc6-66e1-487f-aa18-b633fd0937f8	dreams	dreams/dream_1761265306881.png	\N	2025-10-24 00:21:49.876835+00	2025-10-24 00:21:49.876835+00	2025-10-24 00:21:49.876835+00	{"eTag": "\\"2f240ae34ff2ef9a8a98e607fe47ff1a\\"", "size": 1830498, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T00:21:50.000Z", "contentLength": 1830498, "httpStatusCode": 200}	9f0c83b4-2212-4f47-83d8-7eeaa45beae0	\N	{}	2
59c2a251-abe7-45cc-a665-49042abf2425	dreams	dreams/dream_1761341772702.png	\N	2025-10-24 21:36:15.291213+00	2025-10-24 21:36:15.291213+00	2025-10-24 21:36:15.291213+00	{"eTag": "\\"1364b093f4534d31b2d8a9c7c56967e3\\"", "size": 1538190, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:36:16.000Z", "contentLength": 1538190, "httpStatusCode": 200}	93eeadb9-9685-47ac-b447-875437354854	\N	{}	2
38d12671-d531-4ee3-ba61-1d1a444f13f0	dreams	dreams/dream_1761140944517.png	\N	2025-10-22 13:49:06.639322+00	2025-10-22 13:49:06.639322+00	2025-10-22 13:49:06.639322+00	{"eTag": "\\"ae03e40dd823c92c3d72c5186a37acbb\\"", "size": 1818991, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T13:49:07.000Z", "contentLength": 1818991, "httpStatusCode": 200}	ac9d6354-da29-4fe5-abcf-4c60c1eadb68	\N	{}	2
2331c756-93f6-4cfc-b3cd-17e121fa080d	dreams	dreams/dream_1761247619385.png	\N	2025-10-23 19:27:01.522532+00	2025-10-23 19:27:01.522532+00	2025-10-23 19:27:01.522532+00	{"eTag": "\\"23bfaf24b8855db93e685c6e9dcaf662\\"", "size": 1522898, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T19:27:02.000Z", "contentLength": 1522898, "httpStatusCode": 200}	266f1fa5-4be3-4854-8e1c-45065c845965	\N	{}	2
32ce457b-993b-4134-a842-4eac6bda8c21	dreams	dreams/dream_1761260442235.png	\N	2025-10-23 23:00:46.228968+00	2025-10-23 23:00:46.228968+00	2025-10-23 23:00:46.228968+00	{"eTag": "\\"c6d8db4795be645a7a1f9b55f2d83acd\\"", "size": 1578594, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:00:47.000Z", "contentLength": 1578594, "httpStatusCode": 200}	9cca20cd-4c1e-4690-9b36-2f540a5fa897	\N	{}	2
d6a4bbf3-9414-4e20-9d23-cc42d9cb0c38	dreams	dreams/dream_1761443740038.png	\N	2025-10-26 01:55:42.605532+00	2025-10-26 01:55:42.605532+00	2025-10-26 01:55:42.605532+00	{"eTag": "\\"090355c6f3e2b8b9a65e9ed14fc6d73a\\"", "size": 1657639, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T01:55:43.000Z", "contentLength": 1657639, "httpStatusCode": 200}	07f32638-500a-44b1-80be-a8b1dc2ee515	\N	{}	2
97ef97df-8083-4890-bdbc-6c7bc0c64b38	dreams	dreams/dream_1761260915104.png	\N	2025-10-23 23:08:40.373669+00	2025-10-23 23:08:40.373669+00	2025-10-23 23:08:40.373669+00	{"eTag": "\\"d9e48199aaa48a76bb1c43324793af5c\\"", "size": 1522888, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:08:41.000Z", "contentLength": 1522888, "httpStatusCode": 200}	767a0f42-9859-43cb-b22b-6ad852623296	\N	{}	2
7314f889-29b4-44b1-b855-37c6a50804c9	dreams	dreams/dream_1761261116431.png	\N	2025-10-23 23:12:00.612389+00	2025-10-23 23:12:00.612389+00	2025-10-23 23:12:00.612389+00	{"eTag": "\\"e82ed753045d1c4e40fe9949c77f392c\\"", "size": 1456493, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:12:01.000Z", "contentLength": 1456493, "httpStatusCode": 200}	2cd4a894-493b-4ed6-8731-329d1e42fef2	\N	{}	2
a3280a57-93f1-47c0-b906-dff8ba37bcda	dreams	dreams/dream_1761261402659.png	\N	2025-10-23 23:16:46.55774+00	2025-10-23 23:16:46.55774+00	2025-10-23 23:16:46.55774+00	{"eTag": "\\"ba99ee01a42f3d5da49a0e0ef72cefd7\\"", "size": 1771228, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:16:47.000Z", "contentLength": 1771228, "httpStatusCode": 200}	d769a554-b6aa-47c8-840a-89dbf888017b	\N	{}	2
efe4d18b-1524-43e5-b54e-9303583d9b6d	dreams	dreams/dream_1761330745572.png	\N	2025-10-24 18:32:28.898324+00	2025-10-24 18:32:28.898324+00	2025-10-24 18:32:28.898324+00	{"eTag": "\\"f50c290628ddf6e6b35332cfabb68ca5\\"", "size": 1635242, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T18:32:29.000Z", "contentLength": 1635242, "httpStatusCode": 200}	3ee91d48-4506-4dbf-a816-e553ac9c1cc4	\N	{}	2
7e82c624-0035-49d9-adb1-b4930ff186cd	dreams	dreams/dream_1761342048329.png	\N	2025-10-24 21:40:51.09107+00	2025-10-24 21:40:51.09107+00	2025-10-24 21:40:51.09107+00	{"eTag": "\\"e62f618b4e1eb2a8ef29750214f59b39\\"", "size": 1590734, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:40:52.000Z", "contentLength": 1590734, "httpStatusCode": 200}	72778703-adba-46f1-9b24-500bbea0138a	\N	{}	2
518e42e5-59da-4aa0-9a17-615c25a10b68	dreams	dreams/dream_1761342344449.png	\N	2025-10-24 21:45:47.599057+00	2025-10-24 21:45:47.599057+00	2025-10-24 21:45:47.599057+00	{"eTag": "\\"1b9ac73ce94d8156ce90c3e6611943f6\\"", "size": 1587020, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:45:48.000Z", "contentLength": 1587020, "httpStatusCode": 200}	9b45b47f-11ff-4b11-9349-bc8da99415c3	\N	{}	2
fade279d-b7cc-405b-84a2-8b35e0c1dcea	dreams	dreams/dream_1761342642224.png	\N	2025-10-24 21:50:44.239397+00	2025-10-24 21:50:44.239397+00	2025-10-24 21:50:44.239397+00	{"eTag": "\\"3f2f9d133e9dff05624cf395d6398ca6\\"", "size": 1469618, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:50:45.000Z", "contentLength": 1469618, "httpStatusCode": 200}	56f8df89-92a3-4f90-a3cb-ff18e3087914	\N	{}	2
53e62a1e-cc09-4189-a9ad-0fbb330f082b	dreams	dreams/dream_1761343081201.png	\N	2025-10-24 21:58:04.125869+00	2025-10-24 21:58:04.125869+00	2025-10-24 21:58:04.125869+00	{"eTag": "\\"a95fec7d59514d0d0f5270481103b17f\\"", "size": 1675524, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:58:05.000Z", "contentLength": 1675524, "httpStatusCode": 200}	fbfaf4b3-7144-4b0f-8a74-036da612ac77	\N	{}	2
f859a55a-fd40-471e-9e4c-b80dcde0498d	dreams	dreams/dream_1761343383300.png	\N	2025-10-24 22:03:05.431406+00	2025-10-24 22:03:05.431406+00	2025-10-24 22:03:05.431406+00	{"eTag": "\\"424eb0959f950292459bcde0782e04dc\\"", "size": 1532086, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:03:06.000Z", "contentLength": 1532086, "httpStatusCode": 200}	25c4735c-2d0d-4fc6-aca5-3e7085518384	\N	{}	2
61722300-a861-4411-8d2b-adfdc22adcf8	dreams	dreams/dream_1761343753676.png	\N	2025-10-24 22:09:16.095815+00	2025-10-24 22:09:16.095815+00	2025-10-24 22:09:16.095815+00	{"eTag": "\\"c204cf3995664485eeaaf463d67fdd43\\"", "size": 1404774, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:09:17.000Z", "contentLength": 1404774, "httpStatusCode": 200}	69d1df0c-e5e4-43e2-a23f-c6c8b247b29b	\N	{}	2
4d5c61ff-7537-4d18-8db1-ffdf3c82bfc1	dreams	dreams/dream_1761143002262.png	\N	2025-10-22 14:23:29.207498+00	2025-10-22 14:23:29.207498+00	2025-10-22 14:23:29.207498+00	{"eTag": "\\"d9c7de06d4011cb4d2a85499713047f7\\"", "size": 1754576, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T14:23:30.000Z", "contentLength": 1754576, "httpStatusCode": 200}	49109ef7-d434-4cec-b13b-376b0c265d0f	\N	{}	2
6c61a3e8-1ede-4ca2-a47a-43b27de0f984	dreams	dreams/dream_1761143391210.png	\N	2025-10-22 14:29:52.659309+00	2025-10-22 14:29:52.659309+00	2025-10-22 14:29:52.659309+00	{"eTag": "\\"d5cab023d407f8b95cf50aca2c8475b3\\"", "size": 1500868, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T14:29:53.000Z", "contentLength": 1500868, "httpStatusCode": 200}	61c2e0e8-8ede-415e-b7e7-156330a81f82	\N	{}	2
65e56291-5e90-42fb-be07-ef5ee21f160a	dreams	dreams/dream_1761252102752.png	\N	2025-10-23 20:41:46.77475+00	2025-10-23 20:41:46.77475+00	2025-10-23 20:41:46.77475+00	{"eTag": "\\"9626d633df9b442efd3bcc72c49de633\\"", "size": 1547935, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T20:41:47.000Z", "contentLength": 1547935, "httpStatusCode": 200}	e22ee8d0-e8e2-4cac-8bc5-c7b6a7c5ab05	\N	{}	2
7f7fb172-99f8-46e3-ad17-d6a41ad30e47	dreams	dreams/dream_1761143764214.png	\N	2025-10-22 14:36:05.664069+00	2025-10-22 14:36:05.664069+00	2025-10-22 14:36:05.664069+00	{"eTag": "\\"8229c8d144727e243ac9ae4caca62157\\"", "size": 1647505, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T14:36:06.000Z", "contentLength": 1647505, "httpStatusCode": 200}	23894738-e834-4a04-8d38-235987608099	\N	{}	2
3c907ee0-72bc-4797-9f2e-e0bc523488a5	dreams	dreams/dream_1761444578299.png	\N	2025-10-26 02:09:40.430903+00	2025-10-26 02:09:40.430903+00	2025-10-26 02:09:40.430903+00	{"eTag": "\\"c755dc74e89685b62f0f3a3385e5bb98\\"", "size": 1522766, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T02:09:41.000Z", "contentLength": 1522766, "httpStatusCode": 200}	e23e3712-bba4-4468-a9ed-df289de4911c	\N	{}	2
6a5183f6-c60f-4ac0-9906-fb5588a119ed	dreams	dreams/dream_1761143868602.png	\N	2025-10-22 14:37:50.250471+00	2025-10-22 14:37:50.250471+00	2025-10-22 14:37:50.250471+00	{"eTag": "\\"f67814b806abd278b626df1fd55d8743\\"", "size": 1779428, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T14:37:51.000Z", "contentLength": 1779428, "httpStatusCode": 200}	7268b84e-4a18-4c52-a55f-a44aa4b9e299	\N	{}	2
15321b71-d0fe-41d7-8fc1-fb36c418cf97	dreams	dreams/dream_1761261986712.png	\N	2025-10-23 23:26:31.176294+00	2025-10-23 23:26:31.176294+00	2025-10-23 23:26:31.176294+00	{"eTag": "\\"3060619165bd79f8d49f3625e39be7bd\\"", "size": 1564385, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:26:32.000Z", "contentLength": 1564385, "httpStatusCode": 200}	e38a5b22-d71c-436c-ac00-5598413c1260	\N	{}	2
e11c35e0-3fce-411e-bec8-be99908ac224	dreams	dreams/dream_1761143920569.png	\N	2025-10-22 14:38:42.050434+00	2025-10-22 14:38:42.050434+00	2025-10-22 14:38:42.050434+00	{"eTag": "\\"bd8c13248ca24e841d998e2d201d2d47\\"", "size": 1751858, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T14:38:42.000Z", "contentLength": 1751858, "httpStatusCode": 200}	147a82d3-aea7-45d5-adf5-fe2dae95a84f	\N	{}	2
98766d22-5ee1-44de-8f05-0b1f10c1eadb	dreams	dreams/dream_1761262267651.png	\N	2025-10-23 23:31:12.850746+00	2025-10-23 23:31:12.850746+00	2025-10-23 23:31:12.850746+00	{"eTag": "\\"5880071a1b718287afaa49527c37e28e\\"", "size": 1590421, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:31:13.000Z", "contentLength": 1590421, "httpStatusCode": 200}	c9ea0f58-aac0-47a5-8cdf-8f96b5ffa375	\N	{}	2
f2be4c07-6f7c-45c6-8f3b-b1252749d092	dreams	dreams/dream_1761262547675.png	\N	2025-10-23 23:36:07.049666+00	2025-10-23 23:36:07.049666+00	2025-10-23 23:36:07.049666+00	{"eTag": "\\"9e4becb1383247d277332a438b701108\\"", "size": 1550706, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:36:07.000Z", "contentLength": 1550706, "httpStatusCode": 200}	45259908-7dd3-4377-85e0-1fd038bb3e63	\N	{}	2
3087f76c-d61e-44fb-86d2-1814e87f8380	dreams	dreams/dream_1761262782544.png	\N	2025-10-23 23:39:47.907112+00	2025-10-23 23:39:47.907112+00	2025-10-23 23:39:47.907112+00	{"eTag": "\\"c3203704e416e2ea06505f010d012c96\\"", "size": 1673704, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:39:48.000Z", "contentLength": 1673704, "httpStatusCode": 200}	1a15647f-9f1f-4ab7-98d3-2b4b11c58b59	\N	{}	2
635923cc-21f0-4580-b2b2-d650c322244c	dreams	dreams/dream_1761339248993.png	\N	2025-10-24 20:54:10.774486+00	2025-10-24 20:54:10.774486+00	2025-10-24 20:54:10.774486+00	{"eTag": "\\"0c975d90319539bab753c9bc2493d28b\\"", "size": 1483083, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:54:11.000Z", "contentLength": 1483083, "httpStatusCode": 200}	ccd83667-d9fc-4b30-8d78-d7d0485dd097	\N	{}	2
0ca09db2-3736-4a74-acdd-8bef5b899070	dreams	dreams/dream_1761339400941.png	\N	2025-10-24 20:56:43.019384+00	2025-10-24 20:56:43.019384+00	2025-10-24 20:56:43.019384+00	{"eTag": "\\"628e913c0edc14d7b7598a0a99dd12d9\\"", "size": 1620952, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:56:43.000Z", "contentLength": 1620952, "httpStatusCode": 200}	cc0c0cbe-0341-48d3-aa26-9affcbfa621a	\N	{}	2
784a03f7-19f3-4c1c-ab2c-accb8cb40463	dreams	dreams/dream_1761339587840.png	\N	2025-10-24 20:59:49.223961+00	2025-10-24 20:59:49.223961+00	2025-10-24 20:59:49.223961+00	{"eTag": "\\"47adc22d6b38b7a7fccd6bd6edc4faff\\"", "size": 1669731, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T20:59:50.000Z", "contentLength": 1669731, "httpStatusCode": 200}	d0050157-0ce5-4415-85bb-9d48c42fc895	\N	{}	2
9bf3db51-10d6-41f2-98ee-3f4fd00a35ad	dreams	dreams/dream_1761145992362.png	\N	2025-10-22 15:13:14.830225+00	2025-10-22 15:13:14.830225+00	2025-10-22 15:13:14.830225+00	{"eTag": "\\"35d4fe58bb2f84082653ff4df803c28a\\"", "size": 1634187, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T15:13:15.000Z", "contentLength": 1634187, "httpStatusCode": 200}	e587a994-a861-45fe-a5e4-9122db1262e5	\N	{}	2
59d6ea23-ceb5-4c35-9eb3-430b49b10c47	dreams	dreams/dream_1761146187373.png	\N	2025-10-22 15:16:28.911071+00	2025-10-22 15:16:28.911071+00	2025-10-22 15:16:28.911071+00	{"eTag": "\\"e5e3ea122770c51cfbf9fdac9e1777f9\\"", "size": 1418444, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T15:16:29.000Z", "contentLength": 1418444, "httpStatusCode": 200}	041ee616-c634-42b0-90e4-6b567723515b	\N	{}	2
5aed2435-4b1e-45ec-b9b0-81be8cb85b5a	dreams	dreams/dream_1761252674670.png	\N	2025-10-23 20:51:18.958141+00	2025-10-23 20:51:18.958141+00	2025-10-23 20:51:18.958141+00	{"eTag": "\\"b21f200de87ff790aa2af50f07d1c380\\"", "size": 1652863, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T20:51:19.000Z", "contentLength": 1652863, "httpStatusCode": 200}	8dad3418-4ba4-49ba-89cb-70483b5fa7bc	\N	{}	2
f6d5b537-2159-4d6a-943f-383c098e5965	dreams	dreams/dream_1761146240573.png	\N	2025-10-22 15:17:22.307069+00	2025-10-22 15:17:22.307069+00	2025-10-22 15:17:22.307069+00	{"eTag": "\\"cee4215f88431bb1f3c2fef4dd53afb4\\"", "size": 1466704, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T15:17:23.000Z", "contentLength": 1466704, "httpStatusCode": 200}	b1df97d3-af29-448f-b50d-8a813f09d4c6	\N	{}	2
381244f9-ef4b-4866-88ed-ab6f3d868360	dreams	dreams/dream_1761452945852.png	\N	2025-10-26 04:29:09.107414+00	2025-10-26 04:29:09.107414+00	2025-10-26 04:29:09.107414+00	{"eTag": "\\"6a4d5952ee8d361ed48db90bf751f961\\"", "size": 1529310, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T04:29:10.000Z", "contentLength": 1529310, "httpStatusCode": 200}	66c505b0-737c-4fe4-96bd-ce2b14479c3c	\N	{}	2
5edded68-cb15-4d69-a9c5-005b0d4c4bd5	dreams	dreams/dream_1761146347156.png	\N	2025-10-22 15:19:08.536408+00	2025-10-22 15:19:08.536408+00	2025-10-22 15:19:08.536408+00	{"eTag": "\\"f5431d8d3eeaf1116f3b5d61fc72fe38\\"", "size": 1531789, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T15:19:09.000Z", "contentLength": 1531789, "httpStatusCode": 200}	85ad7d20-d1cb-4c65-bfde-06a0e72bb650	\N	{}	2
e411b6a6-16cb-463d-9aa7-3bcf4f061bac	dreams	dreams/dream_1761263062467.png	\N	2025-10-23 23:44:25.615223+00	2025-10-23 23:44:25.615223+00	2025-10-23 23:44:25.615223+00	{"eTag": "\\"4764c31d55625347a86919c809fc54cf\\"", "size": 1750898, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:44:26.000Z", "contentLength": 1750898, "httpStatusCode": 200}	a9e67da5-aaf5-4237-b8b4-1cf026eeb87d	\N	{}	2
4b27b278-d63b-411c-9f0f-57690f82a07c	dreams	dreams/dream_1761146407918.png	\N	2025-10-22 15:20:09.497211+00	2025-10-22 15:20:09.497211+00	2025-10-22 15:20:09.497211+00	{"eTag": "\\"ab8f81eeabffd0f89e21d05af42057c6\\"", "size": 1627972, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T15:20:10.000Z", "contentLength": 1627972, "httpStatusCode": 200}	ecdf6db2-6e37-4d7f-93e8-d6a8d470a822	\N	{}	2
eeac3e9e-8bcf-420e-b7e0-a9fae6e92483	dreams	dreams/dream_1761340141338.png	\N	2025-10-24 21:09:02.998782+00	2025-10-24 21:09:02.998782+00	2025-10-24 21:09:02.998782+00	{"eTag": "\\"fe95d926a7c44019b4ccc89bc979572e\\"", "size": 1530261, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:09:03.000Z", "contentLength": 1530261, "httpStatusCode": 200}	1277138a-e410-4345-b68f-1cf04a53382c	\N	{}	2
db852f7f-2b6a-45cc-b338-6ef18a0bdb4f	dreams	dreams/dream_1761168391609.png	\N	2025-10-22 21:26:40.527089+00	2025-10-22 21:26:40.527089+00	2025-10-22 21:26:40.527089+00	{"eTag": "\\"f21c2bd03a621ce5830eb5e2b2aedfb1\\"", "size": 1544357, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T21:26:41.000Z", "contentLength": 1544357, "httpStatusCode": 200}	7d73e9bc-4ce8-40a2-9916-9cc7f6d578a0	\N	{}	2
78735cbc-a70f-4866-a70b-2b7178f5e4ec	dreams	dreams/dream_1761169725538.png	\N	2025-10-22 21:49:29.851847+00	2025-10-22 21:49:29.851847+00	2025-10-22 21:49:29.851847+00	{"eTag": "\\"67b95871cdc0f9385e0b4722c70943a9\\"", "size": 1609308, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T21:49:30.000Z", "contentLength": 1609308, "httpStatusCode": 200}	437e72f9-af44-4988-ae41-aa35522f8fcf	\N	{}	2
d4732e3f-f160-4927-9da5-4794584394fe	dreams	dreams/dream_1761340669388.png	\N	2025-10-24 21:17:51.443396+00	2025-10-24 21:17:51.443396+00	2025-10-24 21:17:51.443396+00	{"eTag": "\\"668cb28d623937d45362cdf3c2f5bc83\\"", "size": 1484539, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:17:52.000Z", "contentLength": 1484539, "httpStatusCode": 200}	e3b60bda-8e2f-46a4-9982-4bcde84cc836	\N	{}	2
f01c8bba-ca74-4e5d-b05f-93da30be37d1	dreams	dreams/dream_1761170023217.png	\N	2025-10-22 21:55:06.361967+00	2025-10-22 21:55:06.361967+00	2025-10-22 21:55:06.361967+00	{"eTag": "\\"fc0666d9522c2df55be255c0208817f5\\"", "size": 1535884, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T21:55:07.000Z", "contentLength": 1535884, "httpStatusCode": 200}	5770f1eb-66de-4836-9b37-6a74795aa671	\N	{}	2
ca64ac84-9b4e-4c10-9ced-56c9543b03d3	dreams	dreams/dream_1761170645994.png	\N	2025-10-22 22:04:37.966954+00	2025-10-22 22:04:37.966954+00	2025-10-22 22:04:37.966954+00	{"eTag": "\\"7b2d922b22f3dc49807fe0989557baaf\\"", "size": 1578399, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:04:38.000Z", "contentLength": 1578399, "httpStatusCode": 200}	9be1dde0-823c-4e08-9251-bd7825869737	\N	{}	2
273c7868-5294-4112-8b41-b37cad730e78	dreams	dreams/dream_1761170921366.png	\N	2025-10-22 22:09:00.906862+00	2025-10-22 22:09:00.906862+00	2025-10-22 22:09:00.906862+00	{"eTag": "\\"c5e2d4d594ccd46f002682d72f20ae81\\"", "size": 1404598, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:09:01.000Z", "contentLength": 1404598, "httpStatusCode": 200}	cbecfeed-d1ed-48c6-b7d7-ec83e7d64b1c	\N	{}	2
1dc25c6d-748b-4db9-84c6-9b2194e40283	dreams	dreams/dream_1761171270911.png	\N	2025-10-22 22:15:03.797728+00	2025-10-22 22:15:03.797728+00	2025-10-22 22:15:03.797728+00	{"eTag": "\\"cbc535e202fcc9db4efd1e71dce97937\\"", "size": 1499460, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:15:04.000Z", "contentLength": 1499460, "httpStatusCode": 200}	b1bd5f88-b08f-4db2-ac6c-55bf461970ee	\N	{}	2
561879df-f901-47d6-a3cd-e209a4632a35	dreams	dreams/dream_1761171556754.png	\N	2025-10-22 22:19:51.346958+00	2025-10-22 22:19:51.346958+00	2025-10-22 22:19:51.346958+00	{"eTag": "\\"4a1281cd3a0964014f209af0d5a71d56\\"", "size": 1659777, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:19:52.000Z", "contentLength": 1659777, "httpStatusCode": 200}	cb854f53-7b1d-45de-8453-2aa0670f5849	\N	{}	2
4e259a68-0c3c-43af-a0c9-15e2474a49b7	dreams	dreams/dream_1761171805114.png	\N	2025-10-22 22:24:05.79987+00	2025-10-22 22:24:05.79987+00	2025-10-22 22:24:05.79987+00	{"eTag": "\\"012232ccdc06f463b53770b8e4c0c2a1\\"", "size": 1553084, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:24:06.000Z", "contentLength": 1553084, "httpStatusCode": 200}	402324c7-68e3-40ac-9801-e489453ac3db	\N	{}	2
0158edaa-c11d-4f62-9c0a-7d8e4651804d	dreams	dreams/dream_1761172012660.png	\N	2025-10-22 22:27:40.127975+00	2025-10-22 22:27:40.127975+00	2025-10-22 22:27:40.127975+00	{"eTag": "\\"144ec53e38eab2da5b10ec4f7cbcd16e\\"", "size": 1559263, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:27:41.000Z", "contentLength": 1559263, "httpStatusCode": 200}	98c664bf-99c8-444a-8da7-cdae71cf47b7	\N	{}	2
c4ce0296-00a3-4372-8448-92dd9c50d028	dreams	dreams/dream_1761254094857.png	\N	2025-10-23 21:15:02.071819+00	2025-10-23 21:15:02.071819+00	2025-10-23 21:15:02.071819+00	{"eTag": "\\"3d9cc42c3c1f6d3a12f7dac86dd1103b\\"", "size": 1479308, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:15:02.000Z", "contentLength": 1479308, "httpStatusCode": 200}	4c26d261-666f-4b94-8f2d-4cd5e77d8326	\N	{}	2
868e860a-8613-40f3-af2e-f1effea12e0c	dreams	dreams/dream_1761516657238.png	\N	2025-10-26 22:11:00.930315+00	2025-10-26 22:11:00.930315+00	2025-10-26 22:11:00.930315+00	{"eTag": "\\"a670bd96a2df8690f8fefc65509888e7\\"", "size": 1816719, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T22:11:01.000Z", "contentLength": 1816719, "httpStatusCode": 200}	aeb5ccf2-9843-4a6f-9099-f06ae1cbe4aa	\N	{}	2
fcad1fc9-5f92-4002-8e4e-a4461ee590ae	dreams	dreams/dream_1761254316591.png	\N	2025-10-23 21:18:42.608106+00	2025-10-23 21:18:42.608106+00	2025-10-23 21:18:42.608106+00	{"eTag": "\\"7a0b434c68047f999d3bd4381dc2e34d\\"", "size": 1647314, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:18:43.000Z", "contentLength": 1647314, "httpStatusCode": 200}	1e8e742b-79c9-44f5-8fa7-7bea9d7151a6	\N	{}	2
de154fbf-37ca-4a68-893c-d4c32aef6a5e	dreams	dreams/dream_1761254558319.png	\N	2025-10-23 21:22:48.320858+00	2025-10-23 21:22:48.320858+00	2025-10-23 21:22:48.320858+00	{"eTag": "\\"af89b75d5ade00f7e2ca41e80bbd3e60\\"", "size": 1730337, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:22:49.000Z", "contentLength": 1730337, "httpStatusCode": 200}	160013cd-f1d3-4e5a-9981-07ac63346ccc	\N	{}	2
36d35af8-7b50-4dff-82b6-f0399c0af55b	dreams	dreams/dream_1761517014220.png	\N	2025-10-26 22:16:56.085929+00	2025-10-26 22:16:56.085929+00	2025-10-26 22:16:56.085929+00	{"eTag": "\\"7d293bbd709d88ebbe1523a092cb53ac\\"", "size": 1672513, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T22:16:56.000Z", "contentLength": 1672513, "httpStatusCode": 200}	3fb2829f-cdb7-4562-810d-f57dcf6ec8f2	\N	{}	2
4faf9b33-3588-4b77-8020-aaf565ac7725	dreams	dreams/dream_1761254799912.png	\N	2025-10-23 21:26:45.775988+00	2025-10-23 21:26:45.775988+00	2025-10-23 21:26:45.775988+00	{"eTag": "\\"03e7f6790c5422613f36d65bcbc114a7\\"", "size": 1526207, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:26:46.000Z", "contentLength": 1526207, "httpStatusCode": 200}	47385cb2-874b-4a96-807b-dfc2f5d70103	\N	{}	2
4c32ad12-6165-4010-980c-171d92e32f7d	dreams	dreams/dream_1761255162219.png	\N	2025-10-23 21:32:46.664228+00	2025-10-23 21:32:46.664228+00	2025-10-23 21:32:46.664228+00	{"eTag": "\\"afe13ca868bf25dd61feb7c53d1de857\\"", "size": 1731976, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:32:47.000Z", "contentLength": 1731976, "httpStatusCode": 200}	16ac8669-46b6-40d3-9cc2-172293a9c03f	\N	{}	2
8b648f89-69c1-4547-911d-6e93fb55dc98	dreams	dreams/dream_1761517234771.png	\N	2025-10-26 22:20:37.083211+00	2025-10-26 22:20:37.083211+00	2025-10-26 22:20:37.083211+00	{"eTag": "\\"da6795429d451d810438a81a58fc52a1\\"", "size": 1694185, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T22:20:37.000Z", "contentLength": 1694185, "httpStatusCode": 200}	d390a88b-f048-42a2-b86f-976db1673fb7	\N	{}	2
01847bb1-38e1-4305-af20-4eaff9656afc	dreams	dreams/dream_1761255445922.png	\N	2025-10-23 21:37:35.757949+00	2025-10-23 21:37:35.757949+00	2025-10-23 21:37:35.757949+00	{"eTag": "\\"a6ba27c92a49d81df05880c01e5a37cc\\"", "size": 1260420, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:37:36.000Z", "contentLength": 1260420, "httpStatusCode": 200}	7b0d3c56-616e-4ce0-a5be-de3b6248764a	\N	{}	2
10d3081f-2bef-4d83-9d68-092ebff148fe	dreams	dreams/dream_1761255872632.png	\N	2025-10-23 21:44:37.475604+00	2025-10-23 21:44:37.475604+00	2025-10-23 21:44:37.475604+00	{"eTag": "\\"1641dfa9d2dddc1db6a38e1af6bd8a4c\\"", "size": 1390852, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:44:38.000Z", "contentLength": 1390852, "httpStatusCode": 200}	2912458b-1483-4600-abae-05abaec31c52	\N	{}	2
24e2ceef-afcd-4977-8fe8-e38f0a673ea3	dreams	dreams/dream_1761256102803.png	\N	2025-10-23 21:48:27.113215+00	2025-10-23 21:48:27.113215+00	2025-10-23 21:48:27.113215+00	{"eTag": "\\"8e967ebafd643f4fe5fb5e51b44b0e12\\"", "size": 1606694, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:48:28.000Z", "contentLength": 1606694, "httpStatusCode": 200}	e399cdbf-66ba-4a30-8310-aaa083871aac	\N	{}	2
02f2d5b2-144e-4647-b606-f6aea1cafd46	dreams	dreams/dream_1761256542636.png	\N	2025-10-23 21:56:14.18532+00	2025-10-23 21:56:14.18532+00	2025-10-23 21:56:14.18532+00	{"eTag": "\\"b8500fcd22ba1a7b7a6c6293a4311c4a\\"", "size": 1593915, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T21:56:15.000Z", "contentLength": 1593915, "httpStatusCode": 200}	bb522b81-bc22-47c8-9602-92b308e82ca8	\N	{}	2
3eca87ef-652f-4f5d-91d1-28bb904103a9	dreams	dreams/dream_1761256910224.png	\N	2025-10-23 22:01:53.05725+00	2025-10-23 22:01:53.05725+00	2025-10-23 22:01:53.05725+00	{"eTag": "\\"83088be670c99b942ebd9f0a353328cb\\"", "size": 1544128, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:01:53.000Z", "contentLength": 1544128, "httpStatusCode": 200}	8806582a-7f41-4fc5-9900-5de5de3b4dea	\N	{}	2
54a7ac33-7957-44a3-b812-aa6253c3c680	dreams	dreams/dream_1761257089518.png	\N	2025-10-23 22:04:52.930555+00	2025-10-23 22:04:52.930555+00	2025-10-23 22:04:52.930555+00	{"eTag": "\\"c325295eec7d8a097b2b0a9abd9d55e9\\"", "size": 1562994, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:04:53.000Z", "contentLength": 1562994, "httpStatusCode": 200}	c2298c95-1ec9-4f81-a480-43baff7a829b	\N	{}	2
fb1dfbfc-f048-4d14-bc28-9d23db800ba3	dreams	dreams/dream_1761172269959.png	\N	2025-10-22 22:31:50.270723+00	2025-10-22 22:31:50.270723+00	2025-10-22 22:31:50.270723+00	{"eTag": "\\"535364f68cb6da5832a002a0a123d9ce\\"", "size": 1466728, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:31:51.000Z", "contentLength": 1466728, "httpStatusCode": 200}	22a8cf7c-fca4-4fd8-931b-d469c786c17a	\N	{}	2
49e15a90-ea0e-4c73-a8a1-8d005d15013f	dreams	dreams/dream_1761172547997.png	\N	2025-10-22 22:36:08.118414+00	2025-10-22 22:36:08.118414+00	2025-10-22 22:36:08.118414+00	{"eTag": "\\"af6d149eb947198ac8edbe821a056ea1\\"", "size": 1388929, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:36:08.000Z", "contentLength": 1388929, "httpStatusCode": 200}	c4a404de-2eca-4874-b847-ed577cb0ed0d	\N	{}	2
ff79e6d6-eb7f-4346-9e15-54f1ceed8396	dreams	dreams/dream_1761257237446.png	\N	2025-10-23 22:07:23.941519+00	2025-10-23 22:07:23.941519+00	2025-10-23 22:07:23.941519+00	{"eTag": "\\"d78477b083fd7c75d841af166c79c4c7\\"", "size": 1541265, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:07:24.000Z", "contentLength": 1541265, "httpStatusCode": 200}	779b9750-9651-4ed1-84f0-ff6a3d2930eb	\N	{}	2
f5dfccb3-f291-4c54-b297-78b32fdde82d	dreams	dreams/dream_1761172800547.png	\N	2025-10-22 22:40:17.243528+00	2025-10-22 22:40:17.243528+00	2025-10-22 22:40:17.243528+00	{"eTag": "\\"cfab0fd02ac74f3969005a654b398757\\"", "size": 1666981, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:40:18.000Z", "contentLength": 1666981, "httpStatusCode": 200}	eb05577b-bd6d-4a09-8912-fa9a1d8f980e	\N	{}	2
b4878f90-16e3-47e4-8a9d-c759c96e2645	dreams	dreams/dream_1761517922548.png	\N	2025-10-26 22:32:04.4258+00	2025-10-26 22:32:04.4258+00	2025-10-26 22:32:04.4258+00	{"eTag": "\\"a585b1e499f4ae636c5cb5e1b3dc197d\\"", "size": 1725555, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T22:32:05.000Z", "contentLength": 1725555, "httpStatusCode": 200}	d5230724-c0f3-4b65-9883-2002ab880a8c	\N	{}	2
83ac9b19-1869-442d-8a48-c40a3dc426f3	dreams	dreams/dream_1761173546525.png	\N	2025-10-22 22:53:17.405836+00	2025-10-22 22:53:17.405836+00	2025-10-22 22:53:17.405836+00	{"eTag": "\\"59c4d89aa9845ada7de58d020b40fe00\\"", "size": 1733644, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:53:18.000Z", "contentLength": 1733644, "httpStatusCode": 200}	fcbccad7-2a4a-4af7-9177-3735eaf78136	\N	{}	2
419cb99c-4d1f-4dcd-bf41-2eb78639c590	dreams	dreams/dream_1761257571380.png	\N	2025-10-23 22:12:56.288561+00	2025-10-23 22:12:56.288561+00	2025-10-23 22:12:56.288561+00	{"eTag": "\\"01484b0ccaa690b68f2c109511c34d7e\\"", "size": 1259214, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:12:57.000Z", "contentLength": 1259214, "httpStatusCode": 200}	7cf06d29-b8f0-401b-8f11-7fb43378d466	\N	{}	2
7034b20b-847e-4153-9955-a453a1bf3f9d	dreams	dreams/dream_1761173809729.png	\N	2025-10-22 22:57:49.307357+00	2025-10-22 22:57:49.307357+00	2025-10-22 22:57:49.307357+00	{"eTag": "\\"6a8264cbd9341d93d9643ca3773d0640\\"", "size": 1385809, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T22:57:50.000Z", "contentLength": 1385809, "httpStatusCode": 200}	2ea915b0-0642-4336-b32b-3a252800c23c	\N	{}	2
e3d2ac7e-a741-408d-ac61-7c496a65c6d4	dreams	dreams/dream_1761174042414.png	\N	2025-10-22 23:01:09.925764+00	2025-10-22 23:01:09.925764+00	2025-10-22 23:01:09.925764+00	{"eTag": "\\"bc497e0e048039ca6119af4035af71ba\\"", "size": 1475369, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:01:10.000Z", "contentLength": 1475369, "httpStatusCode": 200}	bf7ef01f-e71c-41e7-84f5-ae7bd652e0e0	\N	{}	2
a0ab818d-f95d-4ef6-a159-70523c44cc1e	dreams	dreams/dream_1761263423476.png	\N	2025-10-23 23:50:27.221308+00	2025-10-23 23:50:27.221308+00	2025-10-23 23:50:27.221308+00	{"eTag": "\\"aab72c1151b03ac9e0d84b55d3c6ca43\\"", "size": 1484127, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:50:28.000Z", "contentLength": 1484127, "httpStatusCode": 200}	3c8db779-56f0-4f51-b8ca-610997ddc0f4	\N	{}	2
62ce148d-eea6-4ff2-b7bc-825819eb8d2e	dreams	dreams/dream_1761174295982.png	\N	2025-10-22 23:05:31.226882+00	2025-10-22 23:05:31.226882+00	2025-10-22 23:05:31.226882+00	{"eTag": "\\"de2e9205943c60d0c4e1451083f79a64\\"", "size": 1548942, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:05:32.000Z", "contentLength": 1548942, "httpStatusCode": 200}	2a7d7c77-976e-40fb-9e3b-d5a8ce034c0b	\N	{}	2
5dd2faa0-7863-486a-9c79-f2e7d404b05e	dreams	dreams/dream_1761174531956.png	\N	2025-10-22 23:09:05.658202+00	2025-10-22 23:09:05.658202+00	2025-10-22 23:09:05.658202+00	{"eTag": "\\"161cb99ab81658c0654055830abe1862\\"", "size": 1627120, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:09:06.000Z", "contentLength": 1627120, "httpStatusCode": 200}	4251e40b-551e-4aa6-ac13-566efbc48a8c	\N	{}	2
a25f5fac-2e0f-4a2a-b050-50c2fc49006e	dreams	dreams/dream_1761174830059.png	\N	2025-10-22 23:14:15.954203+00	2025-10-22 23:14:15.954203+00	2025-10-22 23:14:15.954203+00	{"eTag": "\\"9cdcfbc75bb0e2cdfbbecf2d92e8938b\\"", "size": 1573985, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:14:16.000Z", "contentLength": 1573985, "httpStatusCode": 200}	0f2b4279-db71-4498-9158-384de36453fa	\N	{}	2
9668b9b2-9d87-4b69-99fd-8d49054c2f01	dreams	dreams/dream_1761175089475.png	\N	2025-10-22 23:18:40.489754+00	2025-10-22 23:18:40.489754+00	2025-10-22 23:18:40.489754+00	{"eTag": "\\"9bf996b97627b980890ef6914f448196\\"", "size": 1697139, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:18:41.000Z", "contentLength": 1697139, "httpStatusCode": 200}	f34233c2-3647-4fa0-b7ff-b2e5c6a1d089	\N	{}	2
7a1a6e37-63a2-4096-a258-87c12bccf061	dreams	dreams/dream_1761175256746.png	\N	2025-10-22 23:21:43.157999+00	2025-10-22 23:21:43.157999+00	2025-10-22 23:21:43.157999+00	{"eTag": "\\"4ec152e58495fcdc42aaa9ddd91f6b0f\\"", "size": 1751606, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:21:43.000Z", "contentLength": 1751606, "httpStatusCode": 200}	d2323226-165a-4c8f-b29b-01ac276d2a73	\N	{}	2
342d4558-bc65-4ee4-9733-5340d21f791e	dreams	dreams/dream_1761175606601.png	\N	2025-10-22 23:27:31.617598+00	2025-10-22 23:27:31.617598+00	2025-10-22 23:27:31.617598+00	{"eTag": "\\"0b500313d50181a7543851a37b0bba4a\\"", "size": 1636224, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:27:32.000Z", "contentLength": 1636224, "httpStatusCode": 200}	9938a031-bea4-4f66-9120-82ded337157c	\N	{}	2
f99528d9-2444-47db-b43b-973ae875257b	dreams	dreams/dream_1761176070079.png	\N	2025-10-22 23:34:53.689022+00	2025-10-22 23:34:53.689022+00	2025-10-22 23:34:53.689022+00	{"eTag": "\\"fd834e52abc4ba0a625b2960fc12b22c\\"", "size": 1405419, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:34:54.000Z", "contentLength": 1405419, "httpStatusCode": 200}	28389786-23fb-4c91-be30-6e4908b62acb	\N	{}	2
c26b5ba2-231f-4bd9-99f0-f8247901e6dc	dreams	dreams/dream_1761518018287.png	\N	2025-10-26 22:33:40.475986+00	2025-10-26 22:33:40.475986+00	2025-10-26 22:33:40.475986+00	{"eTag": "\\"aaa9c3a9438a3bab781af3aba5c62df7\\"", "size": 1688527, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T22:33:41.000Z", "contentLength": 1688527, "httpStatusCode": 200}	3ef58bfd-65e7-4917-8947-03e942d860ee	\N	{}	2
64f17fbb-19a4-4273-80f4-0a8b20baf8c4	dreams	dreams/dream_1761176279429.png	\N	2025-10-22 23:38:17.104089+00	2025-10-22 23:38:17.104089+00	2025-10-22 23:38:17.104089+00	{"eTag": "\\"833047dc401fd44c1a7e322d66877bb8\\"", "size": 1510577, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:38:17.000Z", "contentLength": 1510577, "httpStatusCode": 200}	76ce35de-53eb-4521-b1c8-37bc8352191d	\N	{}	2
2f5e3867-4484-495e-852f-f32d54dcdd69	dreams	dreams/dream_1761257929972.png	\N	2025-10-23 22:18:54.315796+00	2025-10-23 22:18:54.315796+00	2025-10-23 22:18:54.315796+00	{"eTag": "\\"9ba45bba3f2132345cbcf4eefb4a5edd\\"", "size": 1347686, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:18:55.000Z", "contentLength": 1347686, "httpStatusCode": 200}	7f58d0ac-ffd9-4e67-a39e-94e1198048f4	\N	{}	2
d6c0fdb6-92bd-43e9-99ad-8e82c3edfb0e	dreams	dreams/dream_1761176528354.png	\N	2025-10-22 23:42:26.696384+00	2025-10-22 23:42:26.696384+00	2025-10-22 23:42:26.696384+00	{"eTag": "\\"0ed6c3cee55e642f320281638d02e62d\\"", "size": 1534343, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:42:27.000Z", "contentLength": 1534343, "httpStatusCode": 200}	7940df96-941c-4f3b-964b-8e8e56d1f341	\N	{}	2
8ae5537d-d3ea-4f61-9057-7bea93e0f6af	dreams	dreams/dream_1761263736630.png	\N	2025-10-23 23:55:38.959104+00	2025-10-23 23:55:38.959104+00	2025-10-23 23:55:38.959104+00	{"eTag": "\\"66a516a7736c76609a6f13065873e29d\\"", "size": 1352293, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T23:55:39.000Z", "contentLength": 1352293, "httpStatusCode": 200}	1fb6756d-89e0-4dec-b760-ed2df41d54d2	\N	{}	2
301f85fc-1329-4755-a40c-022a9f99b162	dreams	dreams/dream_1761176921932.png	\N	2025-10-22 23:49:09.653393+00	2025-10-22 23:49:09.653393+00	2025-10-22 23:49:09.653393+00	{"eTag": "\\"d3179f4173498ca610d7f3ac1702d0c7\\"", "size": 1580712, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:49:10.000Z", "contentLength": 1580712, "httpStatusCode": 200}	f1a6b914-0b43-44ca-9ff4-579a78d84204	\N	{}	2
2b04c053-6d23-44fb-81ec-04ad2dc12435	dreams	dreams/dream_1761264090983.png	\N	2025-10-24 00:01:34.639203+00	2025-10-24 00:01:34.639203+00	2025-10-24 00:01:34.639203+00	{"eTag": "\\"f7060ace4f2f0e6fc441c53fb9e7ed19\\"", "size": 1575528, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T00:01:35.000Z", "contentLength": 1575528, "httpStatusCode": 200}	9f858343-2592-488f-a1d0-50834a098091	\N	{}	2
7b5859f9-6bfc-427e-a9b8-4ee775338a80	dreams	dreams/dream_1761518077928.png	\N	2025-10-26 22:34:40.557687+00	2025-10-26 22:34:40.557687+00	2025-10-26 22:34:40.557687+00	{"eTag": "\\"6926f853b1f3e3c12cd18fa2c72a2d4a\\"", "size": 1504364, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-26T22:34:41.000Z", "contentLength": 1504364, "httpStatusCode": 200}	f9c1a74e-404d-4342-84ba-d5249f01badd	\N	{}	2
3262db6e-f58d-40b8-b930-4741731e9baf	dreams	dreams/dream_1761264297604.png	\N	2025-10-24 00:05:00.365457+00	2025-10-24 00:05:00.365457+00	2025-10-24 00:05:00.365457+00	{"eTag": "\\"e76a0563fab011ff6a4678b17a6c53c0\\"", "size": 1635383, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T00:05:01.000Z", "contentLength": 1635383, "httpStatusCode": 200}	b479f179-d16e-46cb-85dc-66a8bcbdf196	\N	{}	2
6f9018fd-35e6-4e42-8216-096cbed23dd8	dreams	dreams/dream_1761264355353.png	\N	2025-10-24 00:06:00.255484+00	2025-10-24 00:06:00.255484+00	2025-10-24 00:06:00.255484+00	{"eTag": "\\"d1b4ab33c9798869d2214cf0253c19bf\\"", "size": 1400143, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T00:06:01.000Z", "contentLength": 1400143, "httpStatusCode": 200}	b170b235-0725-428b-88d6-636ebd96495a	\N	{}	2
8da7cead-109e-49b1-b69e-98f8f996c800	dreams	dreams/dream_1761264399900.png	\N	2025-10-24 00:06:43.858016+00	2025-10-24 00:06:43.858016+00	2025-10-24 00:06:43.858016+00	{"eTag": "\\"06c1845e54fde69f706cbb2c97fac86d\\"", "size": 1590237, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T00:06:44.000Z", "contentLength": 1590237, "httpStatusCode": 200}	345d4c55-32ae-45f4-aacb-25fe9cada85e	\N	{}	2
9558391b-03fd-4c9b-a45b-5889faf27f02	dreams	dreams/dream_1761264547073.png	\N	2025-10-24 00:09:10.183353+00	2025-10-24 00:09:10.183353+00	2025-10-24 00:09:10.183353+00	{"eTag": "\\"e79de39ad76ef0b34315862af250319b\\"", "size": 1597555, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T00:09:11.000Z", "contentLength": 1597555, "httpStatusCode": 200}	3d560f31-bcd6-404f-b22a-ed6f9b2f6d0e	\N	{}	2
30807b5a-4873-4410-9830-4067c94e7239	dreams	dreams/dream_1761341139916.png	\N	2025-10-24 21:25:47.062079+00	2025-10-24 21:25:47.062079+00	2025-10-24 21:25:47.062079+00	{"eTag": "\\"926da96ef330c9f19c9507760d2220e9\\"", "size": 1355323, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:25:47.000Z", "contentLength": 1355323, "httpStatusCode": 200}	98da8afe-ae31-4916-be77-02d72a0f8234	\N	{}	2
8a81e910-af39-41ba-b2c1-fec28e74457a	dreams	dreams/dream_1761341367202.png	\N	2025-10-24 21:29:29.145357+00	2025-10-24 21:29:29.145357+00	2025-10-24 21:29:29.145357+00	{"eTag": "\\"2ea99b135f2fd91276a828f1748f7a51\\"", "size": 1639523, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:29:30.000Z", "contentLength": 1639523, "httpStatusCode": 200}	71911049-a77a-4a7b-b43e-1996d25cf8e0	\N	{}	2
a727caaf-3cbc-4bfc-8dea-4c76c3b883ec	dreams	dreams/dream_1761341554083.png	\N	2025-10-24 21:32:37.55891+00	2025-10-24 21:32:37.55891+00	2025-10-24 21:32:37.55891+00	{"eTag": "\\"45a4507bfd4a4b78c1863d61bc2eb0dd\\"", "size": 1635278, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T21:32:38.000Z", "contentLength": 1635278, "httpStatusCode": 200}	e8a7179e-6d94-44e9-8406-31011b8a5389	\N	{}	2
0772ce20-b443-40ec-8a80-58b0a81e32a4	dreams	dreams/dream_1761177318645.png	\N	2025-10-22 23:55:46.468168+00	2025-10-22 23:55:46.468168+00	2025-10-22 23:55:46.468168+00	{"eTag": "\\"b9d73eb89a8403a184af2f6c7546102d\\"", "size": 1692960, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-22T23:55:47.000Z", "contentLength": 1692960, "httpStatusCode": 200}	a31f9f70-427f-48b1-923a-9826b7684417	\N	{}	2
f77823fb-6597-4851-850d-4fe53bfca372	dreams	dreams/dream_1761177575808.png	\N	2025-10-23 00:00:21.40481+00	2025-10-23 00:00:21.40481+00	2025-10-23 00:00:21.40481+00	{"eTag": "\\"12b352ec7cd7889e7ad8396f4793ce97\\"", "size": 1744324, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T00:00:22.000Z", "contentLength": 1744324, "httpStatusCode": 200}	7d69bfc8-8511-4824-8541-c4c59767fb16	\N	{}	2
d4472277-9fe3-4b6a-a201-a4ed960f31bc	dreams	dreams/dream_1761257983918.png	\N	2025-10-23 22:19:47.616561+00	2025-10-23 22:19:47.616561+00	2025-10-23 22:19:47.616561+00	{"eTag": "\\"f5449cb09bb1c0535a966204e5bd362a\\"", "size": 1461871, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:19:48.000Z", "contentLength": 1461871, "httpStatusCode": 200}	bc38327d-ac8d-41ea-a944-01ac623e042e	\N	{}	2
2c8e937a-711b-4a0a-957d-9434655ff0c4	dreams	dreams/dream_1761177749912.png	\N	2025-10-23 00:03:42.580073+00	2025-10-23 00:03:42.580073+00	2025-10-23 00:03:42.580073+00	{"eTag": "\\"d7291457b218fb6e2739ce0f40c22b5e\\"", "size": 1411292, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T00:03:43.000Z", "contentLength": 1411292, "httpStatusCode": 200}	90dc8481-5189-4ef6-8098-173872d17eba	\N	{}	2
8c8e7bc4-a939-4425-870e-57b7dfa42822	dreams	dreams/dream_1761635654123.png	\N	2025-10-28 07:14:16.680948+00	2025-10-28 07:14:16.680948+00	2025-10-28 07:14:16.680948+00	{"eTag": "\\"7869743f5b90fa020363e6f16f0dd495\\"", "size": 1807528, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-28T07:14:17.000Z", "contentLength": 1807528, "httpStatusCode": 200}	86d2372c-672d-43a0-b458-a2b1c8b5704d	\N	{}	2
8f721aed-579f-4c75-853a-5391ca742ff2	dreams	dreams/dream_1761178120956.png	\N	2025-10-23 00:09:46.457661+00	2025-10-23 00:09:46.457661+00	2025-10-23 00:09:46.457661+00	{"eTag": "\\"35c2629c77c6943d44eb47ac5dcd9118\\"", "size": 1456570, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T00:09:47.000Z", "contentLength": 1456570, "httpStatusCode": 200}	f9446984-172f-4df2-84c3-5765c7b9e61c	\N	{}	2
e10a4859-5353-462b-a68c-03789d3336c3	dreams	dreams/dream_1761258109285.png	\N	2025-10-23 22:21:52.702063+00	2025-10-23 22:21:52.702063+00	2025-10-23 22:21:52.702063+00	{"eTag": "\\"6b395d62d7473870ba9b15e293577e62\\"", "size": 1577600, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:21:53.000Z", "contentLength": 1577600, "httpStatusCode": 200}	a76cd688-764f-41ff-b8b8-d1d290266946	\N	{}	2
9f9fb80c-0ce0-486f-86f1-bbc28188c051	dreams	dreams/dream_1761178572750.png	\N	2025-10-23 00:16:32.60049+00	2025-10-23 00:16:32.60049+00	2025-10-23 00:16:32.60049+00	{"eTag": "\\"61fa7ac9d7584ad17a99cb102ef5953b\\"", "size": 1579891, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T00:16:33.000Z", "contentLength": 1579891, "httpStatusCode": 200}	bc439402-3e9a-44e1-b7c9-7eb79ece3464	\N	{}	2
8d884f9d-5c17-4659-a204-a6ca3e58feae	dreams	dreams/dream_1761178765801.png	\N	2025-10-23 00:19:51.749053+00	2025-10-23 00:19:51.749053+00	2025-10-23 00:19:51.749053+00	{"eTag": "\\"8d2b75487d6b43ded8a6a56aa8278be3\\"", "size": 1628639, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T00:19:52.000Z", "contentLength": 1628639, "httpStatusCode": 200}	39996136-0da6-4bab-bdf9-27a068c538e7	\N	{}	2
6b1f2287-5126-49f2-8434-e085ed573622	dreams	dreams/dream_1761258452664.png	\N	2025-10-23 22:27:37.596619+00	2025-10-23 22:27:37.596619+00	2025-10-23 22:27:37.596619+00	{"eTag": "\\"3f042bf554b2dfdd1a4f5429e6c5f978\\"", "size": 1494726, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:27:38.000Z", "contentLength": 1494726, "httpStatusCode": 200}	0d8c86f2-1e24-4c3b-9429-1b153bbad34b	\N	{}	2
ff14353d-7468-4297-ba04-7711e2615293	dreams	dreams/dream_1761179194797.png	\N	2025-10-23 00:27:04.374808+00	2025-10-23 00:27:04.374808+00	2025-10-23 00:27:04.374808+00	{"eTag": "\\"b8134d748716b7b0abb75095271ec238\\"", "size": 1581877, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T00:27:05.000Z", "contentLength": 1581877, "httpStatusCode": 200}	68a7638b-9ddf-4e29-9cc9-c077df4ee93c	\N	{}	2
4d954406-7f1c-4c41-aaaa-391a20d9cfed	dreams	dreams/dream_1761184726001.png	\N	2025-10-23 01:58:47.319578+00	2025-10-23 01:58:47.319578+00	2025-10-23 01:58:47.319578+00	{"eTag": "\\"a2b0f8acde3fb985b052c6b185440bf2\\"", "size": 1500932, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T01:58:48.000Z", "contentLength": 1500932, "httpStatusCode": 200}	914f3870-bf78-43ba-be94-969957ccd85f	\N	{}	2
efec64ab-782c-4325-bfc3-03caa1927d59	dreams	dreams/dream_1761259902146.png	\N	2025-10-23 22:51:46.305117+00	2025-10-23 22:51:46.305117+00	2025-10-23 22:51:46.305117+00	{"eTag": "\\"bc9f02032b6ba8c431583077503c7554\\"", "size": 1380796, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:51:47.000Z", "contentLength": 1380796, "httpStatusCode": 200}	b9eedbde-ced9-4bc0-8417-0f96508d7954	\N	{}	2
056b3462-790a-44a1-927c-63ebb181dcf5	dreams	dreams/dream_1761184846472.png	\N	2025-10-23 02:00:48.848618+00	2025-10-23 02:00:48.848618+00	2025-10-23 02:00:48.848618+00	{"eTag": "\\"919595f480c3640b50750bcb2b1f776f\\"", "size": 1556086, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T02:00:49.000Z", "contentLength": 1556086, "httpStatusCode": 200}	cb2b8f6c-e71a-4422-bc1b-597c9b8360b6	\N	{}	2
ba8ece30-803e-4b54-8aff-81bba87066a2	dreams	dreams/dream_1761228506815.png	\N	2025-10-23 14:08:30.515464+00	2025-10-23 14:08:30.515464+00	2025-10-23 14:08:30.515464+00	{"eTag": "\\"160696dd79077f587cee1de2750deb40\\"", "size": 1657031, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T14:08:31.000Z", "contentLength": 1657031, "httpStatusCode": 200}	93187429-fb83-4ac2-b44b-fadcec169cff	\N	{}	2
0b276263-9036-4d76-a807-34b1d482b9a6	dreams	dreams/dream_1761260310595.png	\N	2025-10-23 22:58:34.441205+00	2025-10-23 22:58:34.441205+00	2025-10-23 22:58:34.441205+00	{"eTag": "\\"d35f8f6d89453f4eec79e7a50f8679f5\\"", "size": 1700632, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-23T22:58:35.000Z", "contentLength": 1700632, "httpStatusCode": 200}	af5d6a73-7c47-42d0-a3c3-6d08819c8e5c	\N	{}	2
f94dde12-5bee-48b6-9165-a1e64b597359	dreams	dreams/dream_1761344033019.png	\N	2025-10-24 22:13:55.214353+00	2025-10-24 22:13:55.214353+00	2025-10-24 22:13:55.214353+00	{"eTag": "\\"8456969a37d6ace3b84358bebc4905d3\\"", "size": 1631458, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:13:56.000Z", "contentLength": 1631458, "httpStatusCode": 200}	4d2b82c6-ce61-4da1-892a-0e33a62a6542	\N	{}	2
001202df-949b-45f0-87bf-28cbdc98bac9	dreams	dreams/dream_1761639018268.png	\N	2025-10-28 08:10:20.563795+00	2025-10-28 08:10:20.563795+00	2025-10-28 08:10:20.563795+00	{"eTag": "\\"83c2a9dee41d8d6b7723a958326a623c\\"", "size": 1345107, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-28T08:10:21.000Z", "contentLength": 1345107, "httpStatusCode": 200}	1293a1ba-73e0-4412-bb72-f151954fbc71	\N	{}	2
86cc1066-f771-42e1-89ea-435c0ccc55a6	dreams	dreams/dream_1761344305328.png	\N	2025-10-24 22:18:27.323145+00	2025-10-24 22:18:27.323145+00	2025-10-24 22:18:27.323145+00	{"eTag": "\\"312b1a0c411305462b1ddffee0f43881\\"", "size": 1523003, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:18:28.000Z", "contentLength": 1523003, "httpStatusCode": 200}	d1ce2913-2d53-4abb-8d38-a46528499f40	\N	{}	2
08632620-782c-439e-ba5c-bb73da785243	dreams	dreams/dream_1761344582519.png	\N	2025-10-24 22:23:05.052505+00	2025-10-24 22:23:05.052505+00	2025-10-24 22:23:05.052505+00	{"eTag": "\\"db18adad870b58db700dce6603c25765\\"", "size": 1631893, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:23:05.000Z", "contentLength": 1631893, "httpStatusCode": 200}	c312e101-3ae1-4c3d-bd16-fcad900b2f7e	\N	{}	2
6ddda64d-fe0a-497e-a680-e2a8200ce9bd	dreams	dreams/dream_1761665671653.png	\N	2025-10-28 15:34:34.521285+00	2025-10-28 15:34:34.521285+00	2025-10-28 15:34:34.521285+00	{"eTag": "\\"44c803d953fd136b66d46d5437b2432e\\"", "size": 1731798, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-28T15:34:35.000Z", "contentLength": 1731798, "httpStatusCode": 200}	066d5a78-76e8-4054-9ed0-15197e5a0e2f	\N	{}	2
446d78de-b506-4001-a470-3fd46c1026b6	dreams	dreams/dream_1761344848204.png	\N	2025-10-24 22:27:30.311783+00	2025-10-24 22:27:30.311783+00	2025-10-24 22:27:30.311783+00	{"eTag": "\\"47db4c7f6eefaa240bf4df055928e3ec\\"", "size": 1611220, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:27:31.000Z", "contentLength": 1611220, "httpStatusCode": 200}	8c47c1a6-8389-4cf5-a7ce-ad9d4ed73b94	\N	{}	2
88662f0f-d33a-45ec-a6b2-1a76c901f381	dreams	dreams/dream_1761345084270.png	\N	2025-10-24 22:31:26.218922+00	2025-10-24 22:31:26.218922+00	2025-10-24 22:31:26.218922+00	{"eTag": "\\"58f963712cd0d767d6beea32a3b98b99\\"", "size": 1677900, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:31:27.000Z", "contentLength": 1677900, "httpStatusCode": 200}	8ee007ad-e827-43e4-9270-44a25bf3286d	\N	{}	2
e9faab23-1025-4138-9ffe-c5f359af47a9	dreams	dreams/dream_1761665825352.png	\N	2025-10-28 15:37:07.770572+00	2025-10-28 15:37:07.770572+00	2025-10-28 15:37:07.770572+00	{"eTag": "\\"6828a1a38fec517f7e6d0c3d1413fb34\\"", "size": 1618972, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-28T15:37:08.000Z", "contentLength": 1618972, "httpStatusCode": 200}	d02fc324-5440-4cf4-baaa-75fbf2f605a6	\N	{}	2
1c9aea94-6238-4ee4-81a8-030e5c342b33	dreams	dreams/dream_1761345420223.png	\N	2025-10-24 22:37:04.027017+00	2025-10-24 22:37:04.027017+00	2025-10-24 22:37:04.027017+00	{"eTag": "\\"b7ba8482089d17161861917a5036703c\\"", "size": 1715469, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:37:04.000Z", "contentLength": 1715469, "httpStatusCode": 200}	368e6347-f150-4300-a880-1bc1e110575d	\N	{}	2
6003190e-3e4f-4f79-a81d-e92cc485fc61	dreams	dreams/dream_1761345644020.png	\N	2025-10-24 22:40:46.964949+00	2025-10-24 22:40:46.964949+00	2025-10-24 22:40:46.964949+00	{"eTag": "\\"d2a29dc505d125df42d3b0a72df654b3\\"", "size": 1256763, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:40:47.000Z", "contentLength": 1256763, "httpStatusCode": 200}	df21710b-dc9d-4d87-8dc3-5f25c3dba6e6	\N	{}	2
15ada806-9d50-41c8-9e4e-90fd4696a63a	dreams	dreams/dream_1761666054235.png	\N	2025-10-28 15:40:56.393358+00	2025-10-28 15:40:56.393358+00	2025-10-28 15:40:56.393358+00	{"eTag": "\\"a03359acccaab8f507bbf5c4ebd1d7ae\\"", "size": 1702379, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-28T15:40:57.000Z", "contentLength": 1702379, "httpStatusCode": 200}	778a7873-57af-4677-bd57-bf8725a830f8	\N	{}	2
79121c33-2d11-4dbe-8600-e7b5c2c26582	dreams	dreams/dream_1761345901330.png	\N	2025-10-24 22:45:03.816362+00	2025-10-24 22:45:03.816362+00	2025-10-24 22:45:03.816362+00	{"eTag": "\\"a9e5c637bacbdddcccc7c117d95a396f\\"", "size": 1420804, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:45:04.000Z", "contentLength": 1420804, "httpStatusCode": 200}	a2025c56-65f6-407a-a66d-bf93d9235f6b	\N	{}	2
d1374587-a77e-4ce6-9472-f2719a1829ff	dreams	dreams/dream_1761346076955.png	\N	2025-10-24 22:47:58.868154+00	2025-10-24 22:47:58.868154+00	2025-10-24 22:47:58.868154+00	{"eTag": "\\"6a53cfa8a6a0962c2378edd387ecbd2f\\"", "size": 1346093, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:47:59.000Z", "contentLength": 1346093, "httpStatusCode": 200}	4f9d702e-560a-4c04-890d-fdf8616f910f	\N	{}	2
ca7203f5-8fa6-4fe5-b540-69d3322dd85b	dreams	dreams/dream_1761346332797.png	\N	2025-10-24 22:52:16.42679+00	2025-10-24 22:52:16.42679+00	2025-10-24 22:52:16.42679+00	{"eTag": "\\"e9526ee37d4dc23a1f84fd2faa6c05d5\\"", "size": 1640770, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:52:17.000Z", "contentLength": 1640770, "httpStatusCode": 200}	6577442a-1246-42ca-af44-2298df1be117	\N	{}	2
c8608f36-e1ed-4b46-bc14-cea5ccad062b	dreams	dreams/dream_1761346566479.png	\N	2025-10-24 22:56:08.566599+00	2025-10-24 22:56:08.566599+00	2025-10-24 22:56:08.566599+00	{"eTag": "\\"b959664d445712ca2a0f5815ed22baa4\\"", "size": 1657714, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:56:09.000Z", "contentLength": 1657714, "httpStatusCode": 200}	d32f95a3-f6c3-4bea-b68f-d8845bb8d618	\N	{}	2
1570c675-9704-461d-b8b5-f1d099ae8f4a	dreams	dreams/dream_1761346783894.png	\N	2025-10-24 22:59:46.065538+00	2025-10-24 22:59:46.065538+00	2025-10-24 22:59:46.065538+00	{"eTag": "\\"72263f6289591b075e60b3ee520dbbae\\"", "size": 1333254, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T22:59:46.000Z", "contentLength": 1333254, "httpStatusCode": 200}	d481e1e6-f9af-47c6-a42a-9767399cc987	\N	{}	2
58d3683d-222f-4c00-a821-6b7fc782bb9a	dreams	dreams/dream_1761667806466.png	\N	2025-10-28 16:10:08.80742+00	2025-10-28 16:10:08.80742+00	2025-10-28 16:10:08.80742+00	{"eTag": "\\"1c04facc9431a322d3ab2b31e7148765\\"", "size": 1844900, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-28T16:10:09.000Z", "contentLength": 1844900, "httpStatusCode": 200}	95c5d928-d0db-4788-a4a5-cfd2390981f1	\N	{}	2
1395ad03-d7b8-4cd5-a077-ed60b979c7a0	dreams	dreams/dream_1761347105087.png	\N	2025-10-24 23:05:07.438324+00	2025-10-24 23:05:07.438324+00	2025-10-24 23:05:07.438324+00	{"eTag": "\\"b296e47267b7fda8859a1877589dcb65\\"", "size": 1391289, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T23:05:08.000Z", "contentLength": 1391289, "httpStatusCode": 200}	b667424c-436d-4a79-9f2d-77643ffad7c1	\N	{}	2
3d2ec405-c764-4b65-9315-91265e163655	dreams	dreams/dream_1761348163393.png	\N	2025-10-24 23:22:45.490336+00	2025-10-24 23:22:45.490336+00	2025-10-24 23:22:45.490336+00	{"eTag": "\\"b69f4f6eed6025364b91e656da76a699\\"", "size": 1550851, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-10-24T23:22:46.000Z", "contentLength": 1550851, "httpStatusCode": 200}	6ebf301d-a0f8-40ea-bed5-11c2b7e45f7d	\N	{}	2
\.


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
dreams	dreams	2025-10-19 21:00:10.381937+00	2025-10-19 21:00:10.381937+00
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
\.


--
-- Data for Name: seed_files; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.seed_files (path, hash) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 422, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: badge badge_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badge
    ADD CONSTRAINT badge_pkey PRIMARY KEY (id);


--
-- Name: badge_tier badge_tier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badge_tier
    ADD CONSTRAINT badge_tier_pkey PRIMARY KEY (badge_id, tier_id);


--
-- Name: dream_emotion_context dream_emotion_context_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_emotion_context
    ADD CONSTRAINT dream_emotion_context_pkey PRIMARY KEY (dream_id, emotion_context_id);


--
-- Name: dream_location dream_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_location
    ADD CONSTRAINT dream_location_pkey PRIMARY KEY (dream_id, location_id);


--
-- Name: dream_node dream_node_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_node
    ADD CONSTRAINT dream_node_pkey PRIMARY KEY (id);


--
-- Name: dream_person dream_person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_person
    ADD CONSTRAINT dream_person_pkey PRIMARY KEY (dream_id, person_id);


--
-- Name: dream_privacy dream_privacy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_privacy
    ADD CONSTRAINT dream_privacy_pkey PRIMARY KEY (id);


--
-- Name: dream_state dream_state_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_state
    ADD CONSTRAINT dream_state_pkey PRIMARY KEY (id);


--
-- Name: dream_theme dream_theme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_theme
    ADD CONSTRAINT dream_theme_pkey PRIMARY KEY (dream_id, theme_id);


--
-- Name: emotion emotion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emotion
    ADD CONSTRAINT emotion_pkey PRIMARY KEY (id);


--
-- Name: profile_emotion_context profile_emotion_context_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_emotion_context
    ADD CONSTRAINT profile_emotion_context_pkey PRIMARY KEY (id);


--
-- Name: profile_location profile_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_location
    ADD CONSTRAINT profile_location_pkey PRIMARY KEY (id);


--
-- Name: profile_person profile_person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_person
    ADD CONSTRAINT profile_person_pkey PRIMARY KEY (id);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: profile_theme profile_theme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_theme
    ADD CONSTRAINT profile_theme_pkey PRIMARY KEY (id);


--
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);


--
-- Name: setting setting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.setting
    ADD CONSTRAINT setting_pkey PRIMARY KEY (id);


--
-- Name: skin skin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skin
    ADD CONSTRAINT skin_pkey PRIMARY KEY (id);


--
-- Name: tier tier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tier
    ADD CONSTRAINT tier_pkey PRIMARY KEY (id);


--
-- Name: user_badge user_badge_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badge
    ADD CONSTRAINT user_badge_pkey PRIMARY KEY (profile_id, badge_id);


--
-- Name: user_room user_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_room
    ADD CONSTRAINT user_room_pkey PRIMARY KEY (profile_id, room_id);


--
-- Name: user_skin user_skin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skin
    ADD CONSTRAINT user_skin_pkey PRIMARY KEY (profile_id, skin_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: seed_files seed_files_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.seed_files
    ADD CONSTRAINT seed_files_pkey PRIMARY KEY (path);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: unique_emotion_per_profile; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_emotion_per_profile ON public.profile_emotion_context USING btree (profile_id, lower(label));


--
-- Name: unique_location_per_profile; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_location_per_profile ON public.profile_location USING btree (profile_id, lower(label));


--
-- Name: unique_person_per_profile; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_person_per_profile ON public.profile_person USING btree (profile_id, lower(label));


--
-- Name: unique_theme_per_profile; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_theme_per_profile ON public.profile_theme USING btree (profile_id, lower(label));


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: badge_tier badge_tier_badge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badge_tier
    ADD CONSTRAINT badge_tier_badge_id_fkey FOREIGN KEY (badge_id) REFERENCES public.badge(id) ON DELETE CASCADE;


--
-- Name: badge_tier badge_tier_tier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.badge_tier
    ADD CONSTRAINT badge_tier_tier_id_fkey FOREIGN KEY (tier_id) REFERENCES public.tier(id) ON DELETE CASCADE;


--
-- Name: dream_emotion_context dream_emotion_context_dream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_emotion_context
    ADD CONSTRAINT dream_emotion_context_dream_id_fkey FOREIGN KEY (dream_id) REFERENCES public.dream_node(id) ON DELETE CASCADE;


--
-- Name: dream_emotion_context dream_emotion_context_emotion_context_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_emotion_context
    ADD CONSTRAINT dream_emotion_context_emotion_context_id_fkey FOREIGN KEY (emotion_context_id) REFERENCES public.profile_emotion_context(id) ON DELETE CASCADE;


--
-- Name: dream_location dream_location_dream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_location
    ADD CONSTRAINT dream_location_dream_id_fkey FOREIGN KEY (dream_id) REFERENCES public.dream_node(id) ON DELETE CASCADE;


--
-- Name: dream_location dream_location_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_location
    ADD CONSTRAINT dream_location_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.profile_location(id) ON DELETE CASCADE;


--
-- Name: dream_node dream_node_emotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_node
    ADD CONSTRAINT dream_node_emotion_id_fkey FOREIGN KEY (emotion_id) REFERENCES public.emotion(id);


--
-- Name: dream_node dream_node_privacy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_node
    ADD CONSTRAINT dream_node_privacy_id_fkey FOREIGN KEY (privacy_id) REFERENCES public.dream_privacy(id);


--
-- Name: dream_node dream_node_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_node
    ADD CONSTRAINT dream_node_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: dream_node dream_node_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_node
    ADD CONSTRAINT dream_node_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.dream_state(id);


--
-- Name: dream_person dream_person_dream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_person
    ADD CONSTRAINT dream_person_dream_id_fkey FOREIGN KEY (dream_id) REFERENCES public.dream_node(id) ON DELETE CASCADE;


--
-- Name: dream_person dream_person_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_person
    ADD CONSTRAINT dream_person_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.profile_person(id) ON DELETE CASCADE;


--
-- Name: dream_theme dream_theme_dream_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_theme
    ADD CONSTRAINT dream_theme_dream_id_fkey FOREIGN KEY (dream_id) REFERENCES public.dream_node(id) ON DELETE CASCADE;


--
-- Name: dream_theme dream_theme_theme_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dream_theme
    ADD CONSTRAINT dream_theme_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.profile_theme(id) ON DELETE CASCADE;


--
-- Name: profile_emotion_context profile_emotion_context_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_emotion_context
    ADD CONSTRAINT profile_emotion_context_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: profile profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: profile_location profile_location_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_location
    ADD CONSTRAINT profile_location_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: profile_person profile_person_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_person
    ADD CONSTRAINT profile_person_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: profile_theme profile_theme_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_theme
    ADD CONSTRAINT profile_theme_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: setting setting_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.setting
    ADD CONSTRAINT setting_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: user_badge user_badge_badge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badge
    ADD CONSTRAINT user_badge_badge_id_fkey FOREIGN KEY (badge_id) REFERENCES public.badge(id) ON DELETE CASCADE;


--
-- Name: user_badge user_badge_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badge
    ADD CONSTRAINT user_badge_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: user_room user_room_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_room
    ADD CONSTRAINT user_room_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: user_room user_room_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_room
    ADD CONSTRAINT user_room_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room(id) ON DELETE CASCADE;


--
-- Name: user_skin user_skin_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skin
    ADD CONSTRAINT user_skin_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- Name: user_skin user_skin_skin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skin
    ADD CONSTRAINT user_skin_skin_id_fkey FOREIGN KEY (skin_id) REFERENCES public.skin(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: badge Public read-only access to badge; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read-only access to badge" ON public.badge FOR SELECT TO authenticated, anon USING (true);


--
-- Name: dream_privacy Public read-only access to dream_privacy; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read-only access to dream_privacy" ON public.dream_privacy FOR SELECT TO authenticated, anon USING (true);


--
-- Name: dream_state Public read-only access to dream_state; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read-only access to dream_state" ON public.dream_state FOR SELECT TO authenticated, anon USING (true);


--
-- Name: emotion Public read-only access to emotion; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read-only access to emotion" ON public.emotion FOR SELECT TO authenticated, anon USING (true);


--
-- Name: room Public read-only access to room; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read-only access to room" ON public.room FOR SELECT TO authenticated, anon USING (true);


--
-- Name: skin Public read-only access to skin; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read-only access to skin" ON public.skin FOR SELECT TO authenticated, anon USING (true);


--
-- Name: tier Public read-only access to tier; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read-only access to tier" ON public.tier FOR SELECT TO authenticated, anon USING (true);


--
-- Name: badge_tier Public read-only badge_tier; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public read-only badge_tier" ON public.badge_tier FOR SELECT TO authenticated, anon USING (true);


--
-- Name: dream_emotion_context Users can delete own dream emotions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own dream emotions" ON public.dream_emotion_context FOR DELETE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_emotion_context.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_location Users can delete own dream locations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own dream locations" ON public.dream_location FOR DELETE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_location.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_person Users can delete own dream people; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own dream people" ON public.dream_person FOR DELETE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_person.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_theme Users can delete own dream themes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own dream themes" ON public.dream_theme FOR DELETE TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_theme.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_emotion_context Users can insert own dream emotions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own dream emotions" ON public.dream_emotion_context FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_emotion_context.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_location Users can insert own dream locations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own dream locations" ON public.dream_location FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_location.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_person Users can insert own dream people; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own dream people" ON public.dream_person FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_person.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_theme Users can insert own dream themes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own dream themes" ON public.dream_theme FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_theme.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: user_badge Users can manage their own badges; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their own badges" ON public.user_badge TO authenticated USING ((auth.uid() = profile_id)) WITH CHECK ((auth.uid() = profile_id));


--
-- Name: dream_node Users can manage their own dreams; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their own dreams" ON public.dream_node TO authenticated USING ((auth.uid() = profile_id)) WITH CHECK ((auth.uid() = profile_id));


--
-- Name: user_room Users can manage their own rooms; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their own rooms" ON public.user_room TO authenticated USING ((auth.uid() = profile_id)) WITH CHECK ((auth.uid() = profile_id));


--
-- Name: setting Users can manage their own settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their own settings" ON public.setting TO authenticated USING ((auth.uid() = profile_id)) WITH CHECK ((auth.uid() = profile_id));


--
-- Name: user_skin Users can manage their own skins; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their own skins" ON public.user_skin TO authenticated USING ((auth.uid() = profile_id)) WITH CHECK ((auth.uid() = profile_id));


--
-- Name: profile_emotion_context Users can manage their profile_emotion_context; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their profile_emotion_context" ON public.profile_emotion_context USING ((profile_id = auth.uid())) WITH CHECK ((profile_id = auth.uid()));


--
-- Name: profile_location Users can manage their profile_location; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their profile_location" ON public.profile_location USING ((profile_id = auth.uid())) WITH CHECK ((profile_id = auth.uid()));


--
-- Name: profile_person Users can manage their profile_person; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their profile_person" ON public.profile_person USING ((profile_id = auth.uid())) WITH CHECK ((profile_id = auth.uid()));


--
-- Name: profile_theme Users can manage their profile_theme; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can manage their profile_theme" ON public.profile_theme USING ((profile_id = auth.uid())) WITH CHECK ((profile_id = auth.uid()));


--
-- Name: profile_emotion_context Users can read their own emotions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can read their own emotions" ON public.profile_emotion_context FOR SELECT USING ((profile_id = auth.uid()));


--
-- Name: profile_location Users can read their own locations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can read their own locations" ON public.profile_location FOR SELECT USING ((profile_id = auth.uid()));


--
-- Name: profile_person Users can read their own people; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can read their own people" ON public.profile_person FOR SELECT USING ((profile_id = auth.uid()));


--
-- Name: profile_theme Users can read their own themes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can read their own themes" ON public.profile_theme FOR SELECT USING ((profile_id = auth.uid()));


--
-- Name: dream_emotion_context Users can view own dream emotions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own dream emotions" ON public.dream_emotion_context FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_emotion_context.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_location Users can view own dream locations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own dream locations" ON public.dream_location FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_location.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_person Users can view own dream people; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own dream people" ON public.dream_person FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_person.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: dream_theme Users can view own dream themes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own dream themes" ON public.dream_theme FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.dream_node dn
  WHERE ((dn.id = dream_theme.dream_id) AND (dn.profile_id = auth.uid())))));


--
-- Name: badge; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.badge ENABLE ROW LEVEL SECURITY;

--
-- Name: badge_tier; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.badge_tier ENABLE ROW LEVEL SECURITY;

--
-- Name: dream_emotion_context; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dream_emotion_context ENABLE ROW LEVEL SECURITY;

--
-- Name: dream_location; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dream_location ENABLE ROW LEVEL SECURITY;

--
-- Name: dream_node; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dream_node ENABLE ROW LEVEL SECURITY;

--
-- Name: dream_person; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dream_person ENABLE ROW LEVEL SECURITY;

--
-- Name: dream_privacy; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dream_privacy ENABLE ROW LEVEL SECURITY;

--
-- Name: dream_state; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dream_state ENABLE ROW LEVEL SECURITY;

--
-- Name: dream_theme; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dream_theme ENABLE ROW LEVEL SECURITY;

--
-- Name: emotion; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.emotion ENABLE ROW LEVEL SECURITY;

--
-- Name: profile; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

--
-- Name: profile_emotion_context; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profile_emotion_context ENABLE ROW LEVEL SECURITY;

--
-- Name: profile profile_insert_own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY profile_insert_own ON public.profile FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: profile_location; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profile_location ENABLE ROW LEVEL SECURITY;

--
-- Name: profile_person; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profile_person ENABLE ROW LEVEL SECURITY;

--
-- Name: profile profile_select_own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY profile_select_own ON public.profile FOR SELECT TO authenticated USING ((auth.uid() = id));


--
-- Name: profile_theme; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profile_theme ENABLE ROW LEVEL SECURITY;

--
-- Name: profile profile_update_own; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY profile_update_own ON public.profile FOR UPDATE TO authenticated USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: room; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.room ENABLE ROW LEVEL SECURITY;

--
-- Name: setting; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.setting ENABLE ROW LEVEL SECURITY;

--
-- Name: skin; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.skin ENABLE ROW LEVEL SECURITY;

--
-- Name: tier; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tier ENABLE ROW LEVEL SECURITY;

--
-- Name: user_badge; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_badge ENABLE ROW LEVEL SECURITY;

--
-- Name: user_room; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_room ENABLE ROW LEVEL SECURITY;

--
-- Name: user_skin; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_skin ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION get_user_context(params jsonb); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_user_context(params jsonb) TO anon;
GRANT ALL ON FUNCTION public.get_user_context(params jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.get_user_context(params jsonb) TO service_role;


--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE badge; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.badge TO anon;
GRANT ALL ON TABLE public.badge TO authenticated;
GRANT ALL ON TABLE public.badge TO service_role;


--
-- Name: TABLE badge_tier; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.badge_tier TO anon;
GRANT ALL ON TABLE public.badge_tier TO authenticated;
GRANT ALL ON TABLE public.badge_tier TO service_role;


--
-- Name: TABLE dream_emotion_context; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dream_emotion_context TO anon;
GRANT ALL ON TABLE public.dream_emotion_context TO authenticated;
GRANT ALL ON TABLE public.dream_emotion_context TO service_role;


--
-- Name: TABLE dream_location; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dream_location TO anon;
GRANT ALL ON TABLE public.dream_location TO authenticated;
GRANT ALL ON TABLE public.dream_location TO service_role;


--
-- Name: TABLE dream_node; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dream_node TO anon;
GRANT ALL ON TABLE public.dream_node TO authenticated;
GRANT ALL ON TABLE public.dream_node TO service_role;


--
-- Name: TABLE dream_person; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dream_person TO anon;
GRANT ALL ON TABLE public.dream_person TO authenticated;
GRANT ALL ON TABLE public.dream_person TO service_role;


--
-- Name: TABLE dream_privacy; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dream_privacy TO anon;
GRANT ALL ON TABLE public.dream_privacy TO authenticated;
GRANT ALL ON TABLE public.dream_privacy TO service_role;


--
-- Name: TABLE dream_state; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dream_state TO anon;
GRANT ALL ON TABLE public.dream_state TO authenticated;
GRANT ALL ON TABLE public.dream_state TO service_role;


--
-- Name: TABLE dream_theme; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dream_theme TO anon;
GRANT ALL ON TABLE public.dream_theme TO authenticated;
GRANT ALL ON TABLE public.dream_theme TO service_role;


--
-- Name: TABLE emotion; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.emotion TO anon;
GRANT ALL ON TABLE public.emotion TO authenticated;
GRANT ALL ON TABLE public.emotion TO service_role;


--
-- Name: TABLE profile; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profile TO anon;
GRANT ALL ON TABLE public.profile TO authenticated;
GRANT ALL ON TABLE public.profile TO service_role;


--
-- Name: TABLE profile_emotion_context; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profile_emotion_context TO anon;
GRANT ALL ON TABLE public.profile_emotion_context TO authenticated;
GRANT ALL ON TABLE public.profile_emotion_context TO service_role;


--
-- Name: TABLE profile_location; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profile_location TO anon;
GRANT ALL ON TABLE public.profile_location TO authenticated;
GRANT ALL ON TABLE public.profile_location TO service_role;


--
-- Name: TABLE profile_person; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profile_person TO anon;
GRANT ALL ON TABLE public.profile_person TO authenticated;
GRANT ALL ON TABLE public.profile_person TO service_role;


--
-- Name: TABLE profile_theme; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profile_theme TO anon;
GRANT ALL ON TABLE public.profile_theme TO authenticated;
GRANT ALL ON TABLE public.profile_theme TO service_role;


--
-- Name: TABLE room; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.room TO anon;
GRANT ALL ON TABLE public.room TO authenticated;
GRANT ALL ON TABLE public.room TO service_role;


--
-- Name: TABLE setting; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.setting TO anon;
GRANT ALL ON TABLE public.setting TO authenticated;
GRANT ALL ON TABLE public.setting TO service_role;


--
-- Name: TABLE skin; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.skin TO anon;
GRANT ALL ON TABLE public.skin TO authenticated;
GRANT ALL ON TABLE public.skin TO service_role;


--
-- Name: TABLE tier; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.tier TO anon;
GRANT ALL ON TABLE public.tier TO authenticated;
GRANT ALL ON TABLE public.tier TO service_role;


--
-- Name: TABLE user_badge; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_badge TO anon;
GRANT ALL ON TABLE public.user_badge TO authenticated;
GRANT ALL ON TABLE public.user_badge TO service_role;


--
-- Name: TABLE user_room; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_room TO anon;
GRANT ALL ON TABLE public.user_room TO authenticated;
GRANT ALL ON TABLE public.user_room TO service_role;


--
-- Name: TABLE user_skin; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_skin TO anon;
GRANT ALL ON TABLE public.user_skin TO authenticated;
GRANT ALL ON TABLE public.user_skin TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.prefixes TO service_role;
GRANT ALL ON TABLE storage.prefixes TO authenticated;
GRANT ALL ON TABLE storage.prefixes TO anon;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--