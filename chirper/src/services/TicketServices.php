<?php

use src\repositories\TicketRepository; 
use src\models\Ticket;

require_once __DIR__ . "/../models/Ticket.php";
require_once __DIR__ . "/../repositories/TicketRepository.php";

class TicketServices {

    private TicketRepository $repository;

    public function __construct()
    {
        $this->repository = new TicketRepository();
    }

    public function criar(
        string $titulo,
        string $descricao,
        string $prioridade,
        string $patrimonio,
        string $status
    ): Ticket
    {
        $ticket = new Ticket (
            0,
            $titulo,
            $descricao,
            $prioridade,
            $patrimonio,
            $status
        );

        return $this->repository->save($ticket);
    }

    public function atualizar(int $id, array $dadosAtualizados): Ticket {
        $ticket = $this->repository->findById($id);

        if (!$ticket) {
            throw new \Exception("Ticket não encontrado!");
        }

        if (isset($dadosAtualizados['titulo'])) {
            $ticket->setTitulo($dadosAtualizados['titulo']);
        }

        if (isset($dadosAtualizados['descricao'])) {
            $ticket->setDescricao($dadosAtualizados['descricao']);
        }

        return $this->repository->update($ticket);
    }

    public function encerrar(int $id): Ticket {

        $ticket = $this->repository->findById($id);

        if (!$ticket) {
            throw new \Exception("Ticket não encontrado!");
        }

        $ticket->setStatus('encerrado');

        return $this->repository->update($ticket);
    }

    public function atribuirTecnico(int $ticketId, int $tecnicoId): Ticket {
        $ticket = $this->repository->findById($ticketId);

        if (!$ticket) {
            throw new \Exception("Ticket não encontrado!");
        }

        $ticket->setTecnicoId($tecnicoId);
        $ticket->setStatus("Em andamento");

        return $this->repository->update($ticket); 
    }
}