<?php

$env = parse_ini_file(__DIR__ . '/../../.env');

return [
    'host'     => 'ep-green-night-acel3qx9-pooler.sa-east-1.aws.neon.tech',
    'port'     => 5432,
    'dbname'   => 'neondb',
    'user'     => $env['PGUSER'] ?? '',
    'password' => $env['PGPASSWORD'] ?? '',
];

            self::$pdo->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );

            self::$pdo->setAttribute(
                PDO::ATTR_DEFAULT_FETCH_MODE,
                PDO::FETCH_ASSOC
            );

            return self::$pdo;

        } catch (PDOException $e) {

            throw new Exception(
                "Erro ao conectar com banco: " . $e->getMessage()
            );
        }
    }

}

?>