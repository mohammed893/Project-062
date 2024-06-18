--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: assignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assignments (
    assignmentid integer NOT NULL,
    employeeid integer,
    assignmenttype character varying(50),
    decisiondescription text,
    startdate date,
    enddate date,
    duration integer
);


ALTER TABLE public.assignments OWNER TO postgres;

--
-- Name: assignments_assignmentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assignments_assignmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assignments_assignmentid_seq OWNER TO postgres;

--
-- Name: assignments_assignmentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assignments_assignmentid_seq OWNED BY public.assignments.assignmentid;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    employeeid integer NOT NULL,
    name character varying(100) NOT NULL,
    nationalidnumber character varying(20) NOT NULL,
    dateofappointment date NOT NULL,
    insurancenumber character varying(20) NOT NULL,
    contractdate date NOT NULL,
    functionalgroup character varying(50),
    jobtitle character varying(50),
    degree character varying(20),
    address character varying(200),
    dateoflastpromotion date
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_employeeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_employeeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_employeeid_seq OWNER TO postgres;

--
-- Name: employees_employeeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_employeeid_seq OWNED BY public.employees.employeeid;


--
-- Name: penalties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.penalties (
    penaltyid integer NOT NULL,
    employeeid integer,
    penaltydescription text,
    dateofpenalty date
);


ALTER TABLE public.penalties OWNER TO postgres;

--
-- Name: penalties_penaltyid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.penalties_penaltyid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.penalties_penaltyid_seq OWNER TO postgres;

--
-- Name: penalties_penaltyid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.penalties_penaltyid_seq OWNED BY public.penalties.penaltyid;


--
-- Name: promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotions (
    promotionid integer NOT NULL,
    employeeid integer,
    previousdegree character varying(20),
    newdegree character varying(20),
    promotiondate date,
    previoussalary numeric(10,2),
    newsalary numeric(10,2)
);


ALTER TABLE public.promotions OWNER TO postgres;

--
-- Name: promotions_promotionid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promotions_promotionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promotions_promotionid_seq OWNER TO postgres;

--
-- Name: promotions_promotionid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promotions_promotionid_seq OWNED BY public.promotions.promotionid;


--
-- Name: vacations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vacations (
    vacationid integer NOT NULL,
    employeeid integer,
    startdate date,
    enddate date,
    duration integer
);


ALTER TABLE public.vacations OWNER TO postgres;

--
-- Name: vacations_vacationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vacations_vacationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vacations_vacationid_seq OWNER TO postgres;

--
-- Name: vacations_vacationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vacations_vacationid_seq OWNED BY public.vacations.vacationid;

--
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE requests(
    requestid integer NOT NULL,
    employeeid integer NOT NULL,
    receiver_role VARCHAR(50) NOT NULL,
    receiver_name VARCHAR(50),
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    dateofrequest date,
    requestType TEXT NOT NULL);

--
-- Name: requests_requestid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.requests_requestid_seq
AS integer
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;

--
-- Name: assignments assignmentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignments ALTER COLUMN assignmentid SET DEFAULT nextval('public.assignments_assignmentid_seq'::regclass);


--
-- Name: employees employeeid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN employeeid SET DEFAULT nextval('public.employees_employeeid_seq'::regclass);


--
-- Name: penalties penaltyid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.penalties ALTER COLUMN penaltyid SET DEFAULT nextval('public.penalties_penaltyid_seq'::regclass);


--
-- Name: promotions promotionid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions ALTER COLUMN promotionid SET DEFAULT nextval('public.promotions_promotionid_seq'::regclass);


--
-- Name: vacations vacationid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacations ALTER COLUMN vacationid SET DEFAULT nextval('public.vacations_vacationid_seq'::regclass);


--
-- Name: requests requestid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests ALTER COLUMN requestid SET DEFAULT nextval('public.requests_requestid_seq'::regclass);


--
-- Name: assignments assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (assignmentid);


--
-- Name: employees employees_nationalidnumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_nationalidnumber_key UNIQUE (nationalidnumber);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (employeeid);


--
-- Name: penalties penalties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.penalties
    ADD CONSTRAINT penalties_pkey PRIMARY KEY (penaltyid);


--
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (promotionid);


--
-- Name: vacations vacations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacations
    ADD CONSTRAINT vacations_pkey PRIMARY KEY (vacationid);


--
-- Name: vacations requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY(requestid);


--
-- Name: assignments assignments_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(employeeid);


--
-- Name: penalties penalties_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.penalties
    ADD CONSTRAINT penalties_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(employeeid);


--
-- Name: promotions promotions_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(employeeid);


--
-- Name: vacations vacations_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacations
    ADD CONSTRAINT vacations_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(employeeid);


--
-- Name: requests requests_employeeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_employeeid_fkey FOREIGN KEY (employeeid) REFERENCES public.employees(employeeid);


--
-- PostgreSQL database dump complete
--
