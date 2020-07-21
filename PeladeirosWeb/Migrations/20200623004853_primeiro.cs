using System;
using FirebirdSql.EntityFrameworkCore.Firebird.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PeladeirosWeb.Migrations
{
    public partial class primeiro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cidade",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Fb:ValueGenerationStrategy", FbValueGenerationStrategy.SequenceTrigger),
                    CidadeNome = table.Column<string>(maxLength: 50, nullable: false),
                    UF = table.Column<string>(maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cidade", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Fb:ValueGenerationStrategy", FbValueGenerationStrategy.SequenceTrigger),
                    Nome = table.Column<string>(maxLength: 30, nullable: false),
                    Senha = table.Column<string>(maxLength: 8, nullable: false),
                    DatCadastro = table.Column<DateTime>(nullable: false),
                    DatInativo = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Valor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Fb:ValueGenerationStrategy", FbValueGenerationStrategy.SequenceTrigger),
                    Val = table.Column<double>(nullable: false),
                    Mes = table.Column<int>(nullable: false),
                    Ano = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Valor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Peladeiro",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Fb:ValueGenerationStrategy", FbValueGenerationStrategy.SequenceTrigger),
                    Nome = table.Column<string>(maxLength: 30, nullable: false),
                    CPF = table.Column<string>(maxLength: 14, nullable: false),
                    Telefone = table.Column<string>(maxLength: 9, nullable: true),
                    Celular = table.Column<string>(maxLength: 10, nullable: true),
                    DatCadastro = table.Column<DateTime>(nullable: false),
                    DatInativo = table.Column<DateTime>(nullable: false),
                    Endereço = table.Column<string>(maxLength: 50, nullable: true),
                    Numero = table.Column<string>(maxLength: 10, nullable: true),
                    CidadeId = table.Column<int>(nullable: false),
                    Foto = table.Column<byte[]>(nullable: true),
                    DatNascimento = table.Column<DateTime>(nullable: false),
                    Email = table.Column<string>(maxLength: 30, nullable: true),
                    Observacao = table.Column<string>(maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Peladeiro", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Peladeiro_Cidade_CidadeId",
                        column: x => x.CidadeId,
                        principalTable: "Cidade",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Mensalidade",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Fb:ValueGenerationStrategy", FbValueGenerationStrategy.SequenceTrigger),
                    PeladeiroId = table.Column<int>(nullable: false),
                    ValorId = table.Column<int>(nullable: false),
                    DatPgto = table.Column<DateTime>(nullable: false),
                    Obs = table.Column<string>(maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mensalidade", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mensalidade_Peladeiro_Pelad~",
                        column: x => x.PeladeiroId,
                        principalTable: "Peladeiro",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Mensalidade_Valor_ValorId",
                        column: x => x.ValorId,
                        principalTable: "Valor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mensalidade_PeladeiroId",
                table: "Mensalidade",
                column: "PeladeiroId");

            migrationBuilder.CreateIndex(
                name: "IX_Mensalidade_ValorId",
                table: "Mensalidade",
                column: "ValorId");

            migrationBuilder.CreateIndex(
                name: "IX_Peladeiro_CidadeId",
                table: "Peladeiro",
                column: "CidadeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mensalidade");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Peladeiro");

            migrationBuilder.DropTable(
                name: "Valor");

            migrationBuilder.DropTable(
                name: "Cidade");
        }
    }
}
