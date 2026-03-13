CREATE TABLE
    IF NOT EXISTS asados (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        nombre TEXT NOT NULL,
        fecha TEXT,
        hora TEXT,
        lugar TEXT,
        estado TEXT DEFAULT 'planeado',
        creado_en TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS participantes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        asado_id UUID REFERENCES asados (id),
        nombre TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        asado_id UUID REFERENCES asados (id),
        nombre TEXT NOT NULL,
        quien TEXT,
        estado TEXT DEFAULT 'pendiente',
        creado_en TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS gastos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        asado_id UUID REFERENCES asados (id),
        quien TEXT NOT NULL,
        descripcion TEXT,
        monto NUMERIC NOT NULL,
        creado_en TIMESTAMP DEFAULT NOW ()
    );

CREATE TABLE
    IF NOT EXISTS transporte (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        asado_id UUID REFERENCES asados (id),
        nombre TEXT NOT NULL,
        rol TEXT NOT NULL,
        tipo_transporte TEXT,
        lugares_disponibles INTEGER,
        creado_en TIMESTAMP DEFAULT NOW ()
    );