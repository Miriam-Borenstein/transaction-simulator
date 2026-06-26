using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using TransactionSimulator.Application.Transactions.Interfaces;
using TransactionSimulator.Application.Transactions.Models.DTOs;

namespace TransactionSimulator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {

        private readonly ITransactionService _transactionService;
        private readonly ILogger<TransactionsController> _logger;

        public TransactionsController(ITransactionService service, ILogger<TransactionsController> logger)
        {
            _transactionService = service;
            _logger = logger;
        }
        [HttpPost("create")]
        public async Task<ActionResult<CreateTransactionResponseDto>> CreateTransaction([FromBody] CreateTransactionRequestDto createTransactionRequest, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Received request to create transaction for region {Region}", createTransactionRequest.Region);
            var response = await _transactionService.CreateTransactionAsync(createTransactionRequest, cancellationToken);
            return Ok(response);
        }

        [HttpGet("approved")]
        public async Task<ActionResult<List<ApprovedTransactionResponseDto>>> GetApprovedTransactions(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Received request to get approved transactions");
            var approvedTransactions = await _transactionService.GetApprovedTransactionsAsync(cancellationToken);
            return Ok(approvedTransactions);
        }

       

    }
}
